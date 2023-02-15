import { Student } from "../models/Student.js"
import { v4 as uuid } from "uuid"
import { studentRepository } from "../repository/studentRepository.js"
import dotenv from 'dotenv'

dotenv.config()

let students = []

export async function getAll(request, response) {
   let {pageIndex, pageSize} = request.query

   let students = await studentRepository.findAll(pageIndex, pageSize)
   let total = await studentRepository.total()

   if (students) {

      pageIndex = Number(pageIndex || 0)
      pageSize = Number(pageSize || process.env.PAGE_SIZE)
   
      response.send({
         data: students,
         pageIndex,
         pageSize,
         total
      })
   }
   else {
      response.status(500).send({
         msg: "Falha interna do banco de dados."
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
      response.status(500).send({
         msg: "Falha interna do banco de dados."
      })
   }
}

export async function update(request, response) {

   let student = await studentRepository.find(request.body.id)

   if (student) {
      let result = await studentRepository.update(request.body)

      if (result) {
         response.send(request.body)
      }
      else {
         response.status(500).send({
            msg: "Falha interna do banco de dados."
         })
      }
   }
   else {
      response.status(400).send({
         msg: "Estudante não encontrado na base."
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