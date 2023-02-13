import express from "express"
import { getAll, save, update, remove } from "./controllers/studentController.js"

const app = express()
app.use(express.json())

// GET
app.get("/", (request, response) => {
   console.log("GET")

   response.send({
      status: 200,
      message: "REST API"
   })
})

// Obter a lista de estudantes.
app.get("/student", getAll)

// Salvar um novo estudante.
app.post("/student", save)

// Atualizar um estudante.
app.put("/student", update)

// Deletar um estudante.
app.delete("/student", remove)

app.listen(3000)