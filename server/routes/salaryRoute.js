import express from "express"
import authmiddleWare from "../middleware/authMiddleware.js"
import { addSalary,getSalary } from "../controllers/salaryController.js"



const router = express.Router()



router.post("/add",authmiddleWare, addSalary)
router.get("/:id/:role",authmiddleWare, getSalary)


export default router