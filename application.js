import express from "express"
import studentRouter from "./routes/studentRoutes.js"

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

app.listen(3000, () => {
   console.log("Servidor iniciado...")
})