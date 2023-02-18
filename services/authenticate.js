import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export function authenticate(request, response, next) {
    const authorizationHeader = request.headers.authorization

    if (authorizationHeader) {
        const token = authorizationHeader.split(" ")[1] // token == accessToken

        jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
            if (error) {
                // 403 Forbidden
                return response.status(403).send({
                    status: 403,
                    msg: "Acesso Proibido!"
                })
            }

            request.user = user
            next()
        })
    }
    else {
        // 401 Unauthorized
        return response.status(401).send({
            status: 401,
            msg: "Não autorizado!"
        })
    }
}