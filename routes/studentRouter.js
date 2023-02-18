import { Router } from "express"
import { getAll, get, save, update, remove } from "../controllers/studentController.js"
import { authenticate } from "../services/authenticate.js"

const router = Router()

// GET (READ)
router.get("/student", authenticate, getAll)

// GET (READ)
router.get("/student/:id", authenticate, get)

// POST (CREATE)
router.post("/student", authenticate, save)

// PUT (UPDATE)
router.put("/student", authenticate, update)

// DELETE (DELETE)
router.delete("/student", authenticate, remove)

export default router