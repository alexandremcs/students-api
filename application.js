import express from "express"
import studentRouter from "./routes/studentRouter.js"
import userRouter from "./routes/userRouter.js"

const app = express()
app.use(express.json())

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