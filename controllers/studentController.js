import { Student } from "../models/Student.js"
import { v4 as uuid } from "uuid"

let students = []

export async function getAll(request, response) {
   response.send(students)
}

export async function save(request, response) {
   let student = request.body
   student.id = uuid()
   students.push(student)

   response.send(student)
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