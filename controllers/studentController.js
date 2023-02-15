import { Student } from "../models/Student.js"
import { v4 as uuid } from "uuid"
import { studentRepository } from "../repository/studentRepository.js"

let students = []

export async function getAll(request, response) {
   let students = await studentRepository.findAll()

   if (students) {
      response.send(students)
   } else {
      response.status(400).send({
         msg: "Problema com a consulta ao banco de dados."
      })
   }
}

export async function get(request, response) {
   let student = await studentRepository.find(request.params.id)

   if (student) {
      response.send(student)
   } else {
      response.status(400).send({
         msg: "Estudante não encontrado na base."
      })
   }
}

export async function save(request, response) {
   let student = request.body
   student.id = uuid()
   
   let result = await studentRepository.save(student)

   if (result) {
      response.status(201).send(student)
   } else {
      response.status(400).send({
         msg: "O aluno não pode ser salvo!"
      })
   }
}

export async function update(request, response) {
   let newStudent = request.body

   let result = await studentRepository.update(newStudent)

   if (result) {
      response.status(201).send(newStudent)
   } else {
      response.status(400).send({
         msg: "O aluno não pode ser alterado!"
      })
   }
}

export async function remove(request, response) {
   let student = request.body

   let result = await studentRepository.remove(student.id)

   if (result) {
      response.status(201).send(student)
   } else {
      response.status(400).send({
         msg: "O aluno não pode ser removido!"
      })
   }
}