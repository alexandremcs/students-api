import sqlite3 from "sqlite3"
import { open } from "sqlite"
import dotenv from 'dotenv'

dotenv.config()

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
        return db.exec("CREATE TABLE IF NOT EXISTS User (id TEXT, username TEXT, password TEXT)").then (result => {
            return true
        }).catch(error => {
            return false
        })
    })
}

// Return all table registers
async function findAll(index = 0, size = process.env.USER_PAGE_SIZE) {
    if (index < 0) {
        index = 0
    }

    if (size < 0 || size > process.env.USER_PAGE_SIZE) {
        size = process.env.USER_PAGE_SIZE
    }

    return database.then(db => {
        return db.all("SELECT * FROM User LIMIT ? OFFSET ?", [size, index * size]).then(result => result).catch(error => undefined)
    })
}

// Return one register
async function find(id) {
    return database.then(db => {
        return db.get("SELECT * FROM User WHERE id = ?", [id]).then(result => result).catch(error => undefined)
    })
}

// Return one register
async function findUsername(username) {
    return database.then(db => {
        return db.get("SELECT * FROM User WHERE username = ?", [username]).then(result => result).catch(error => undefined)
    })
}

// Insert a new table register
async function save(user) {
    return database.then(db => {
        return db.run("INSERT INTO User (id, username, password) VALUES (?, ?, ?)",
            [
                user.id,
                user.username,
                user.password
            ]
        ).then(result => true).catch(error => false)
    })
}

// Update a table register
async function update(user) {
    return database.then(db => {
        return db.run("UPDATE User SET username = ?, password = ? WHERE id= ?",
            [
                user.id,
                user.username,
                user.password
            ]
        ).then(result => true).catch(error => false)
    })
}

// Remove a table register
async function remove(id) {
    return database.then(db => {
        return db.run("DELETE FROM User WHERE id= ?", [id]
        ).then(result => true).catch(error => false)
    })
}

async function total() {
    return database.then(db => {
        return db.get("SELECT COUNT(1) FROM User").then(result => Object.values(result)[0]).catch(error => undefined)
    })
}

createTable()

export const userRepository = {findAll, find, findUsername, save, update, remove, total}
