import { Router } from "express"
import { getAll, get, save, update, remove } from "../controllers/studentController.js"

const router = Router()

// GET (READ)
router.get("/student", getAll)

// GET (READ)
router.get("/student/:id", get)

// POST (CREATE)
router.post("/student", save)

// PUT (UPDATE)
router.put("/student", update)

// DELETE (DELETE)
router.delete("/student", remove)

export default router