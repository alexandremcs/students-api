import { Router } from "express"
import { signup, signin, signout, token } from "../controllers/userController.js"
import { authenticate } from "../services/authenticate.js"

const router = Router()

// POST
router.post("/user/signup", signup)

// POST
router.post("/user/signin", signin)

// POST
router.post("/user/signout", signout)

// POST
router.post("/user/token", token)

// GET
// router.get("/user", authenticate, getAll)


export default router