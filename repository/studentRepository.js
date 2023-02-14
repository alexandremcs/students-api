import sqlite3 from "sqlite3"
import { open } from "sqlite"

// DB Connection
async function opendb() {
    return open({
        filename: "./data.db",
        driver: sqlite3.Database
    })
}

// Create a Instance of DB
let database = opendb()

// Create table Student if not exists
async function createTable() {
    return database.then(db => {
        return db.exec("CREATE TABLE IF NOT EXISTS Student (id TEXT, name TEXT, age INTEGER, course TEXT, registration TEXT)").then (result => {
            return true
        }).catch(error => {
            return false
        })
    })
}

// Return all table lines
async function findAll() {
    return database.then(db => {
        return db.all("SELECT * FROM Student").then(result => result).catch(error => undefined)
    })
}

// Insert a new table line
async function save(student) {
    return database.then(db => {
        return db.run("INSERT INTO Student (id, name, age, course, registration) VALUES (?, ?, ?, ?, ?)",
            [
                student.id,
                student.name,
                student.age,
                student.course,
                student.registration
            ]
        ).then(result => true).catch(error => false)
    })
}

// Update a table line
async function update(student) {

    return database.then(db => {
        return db.run("UPDATE Student SET name = ?, age = ?, course = ?, registration = ? WHERE id= ?",
            [
                student.name,
                student.age,
                student.course,
                student.registration,
                student.id
            ]
        ).then(result => true).catch(error => false)
    })
}

// Delete a table line
async function remove(id) {

    return database.then(db => {
        return db.run("DELETE FROM Student WHERE id= ?",
            [
                id
            ]
        ).then(result => true).catch(error => false)
    })
}

createTable()

export const studentRepository = {save, findAll, update, remove}
