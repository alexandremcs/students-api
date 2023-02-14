import { Router } from "express"
import { getAll, save, update, remove } from "../controllers/studentController.js"

const router = Router()

// GET (READ)
router.get("/student", getAll)

// POST (CREATE)
router.post("/student", save)

// PUT (UPDATE)
router.put("/student", update)

// DELETE (DELETE)
router.delete("/student", remove)

export default router