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

   for (let i = 0; i < students.length; i++) {
      if (students[i].id == newStudent.id) {
         students[i] = newStudent
      }
   }

   response.send(newStudent)
}

export async function remove(request, response) {
   let id = request.body.id

   for (let i = 0; i < students.length; i++) {
      if (students[i].id == id) {
         students.splice(i, 1)
      }
   }

   response.send(id)
}