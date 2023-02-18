import express from "express"
import studentRouter from "./routes/studentRouter.js"
import userRouter from "./routes/userRouter.js"
import cors from "cors"

const app = express()
app.use(express.json())

// Liberando acesso à aplicação
app.use(cors())

// Validando o formato da requisição do cliente
app.use((error, request, response, next) => {
   if (error instanceof SyntaxError && error.status == 400) {
      //400 Bad Request
      return response.status(400).send({
         status: 400,
         msg: "Bad Request Man!"
      })
   }
})

// GET
app.get("/", (request, response) => {
   console.log("GET")

   response.send({
      status: 200,
      message: "Test API"
   })
})

app.use(studentRouter)
app.use(userRouter)

app.listen(3000, () => {
   console.log("Servidor iniciado...")
})