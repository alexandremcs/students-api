import { User } from "../models/User.js"
import { v4 as uuid } from "uuid"
import bcrypt from "bcryptjs"
import { userRepository } from "../repository/userRepository.js"
import jwt from "jsonwebtoken"

let refreshTokens = []

// Criar uma conta de usuário.
export async function signup(request, response) {
   let _user = await userRepository.findUsername(request.body.username)

   if (_user) {
      // 400 Bad Request
      return response.status(400).send({
         status: 400,
         msg: "Username já cadastrado!"
      })
   }

   let user = User.from(request.body)

   if (typeof user.username != "string" || user.username.trim() == "") {
      return response.status(400).send({
         msg: "Bad Request"
      })
   }

   if (typeof user.password != "string" || user.password.trim() == "") {
      return response.status(400).send({
         msg: "Bad Request"
      })
   }

   user.id = uuid()

   const hash = await bcrypt.hash(user.password, 10)
   user.password = hash

   let result = await userRepository.save(user)

   if (result) {
      user.password = ""
      response.status(201).send(user)
   }
   else {
      response.status(500).send({
         msg: "Falha interna do banco de dados."
      })
   }
}

// Fazer login.
export async function signin(request, response) {
   if (typeof request.body.username != "string" || typeof request.body.password != "string") {
      return response.status(400).send({
         msg: "Bad Request"
      })
   }

   const { username, password } = request.body

   let user = await userRepository.findUsername(username)

   if (user) {
      const checked = await bcrypt.compare(password, user.password)

      if (checked) {
         //Gerando token de acesso.
         const accessToken = jwt.sign({username: user.username, sub: user.id}, process.env.SECRET_KEY, {expiresIn: process.env.EXPIRES_IN})
         const refreshToken = jwt.sign({username: user.username, sub: user.id}, process.env.REFRESH_SECRET_KEY)

         response.send({accessToken, refreshToken})
      } else {
         response.status(200).send({
            msg: "Senha incorreta."
         })
      }
   } else {
      response.status(200).send({
         msg: "Usuário inexistente."
      })
   }

}

// Fazer logout. // token == refreshToken
export async function signout(request, response) {
   const { token } = request.body

   if (typeof token != "string") {
      return response.status(400).send({
         msg: "Bad Request."
      })
   }

   refreshTokens = refreshTokens.filter(refreshToken => refreshToken != token)
   response.send({token})
}

// Fazer refresh de token. // token == refreshToken
export async function token(request, response) {
   const { token } = request.body

   if (typeof token != "string") {
      return response.status(400).send({
         msg: "Bad Request."
      })
   }

   if (!token) {
      return response.status(401).send({
         status: 401,
         msg: "Não autorizado!"
      })
   }

   if (!refreshTokens.includes(token)) {
      return response.status(401).send({
         status: 403,
         msg: "Acesso Proibido!"
      })
   }

   jwt.verify(token, process.env.REFRESH_SECRET_KEY, (error, user) => {
      if (error) {
         // 403 Forbidden
         return response.status(403).send({
            status: 403,
            msg: "Acesso Proibido!"
         })
      }

      const accessToken = jwt.sign({username: user.username, sub: user.id}, process.env.SECRET_KEY, {expiresIn: process.env.EXPIRES_IN})
      response.send({accessToken})
   })
}