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

}

// Fazer logout.
export async function signout(request, response) {

}

// Fazer refresh de token.
export async function token(request, response) {

}