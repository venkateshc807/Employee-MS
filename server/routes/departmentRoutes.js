import express from "express"
import authmiddleWare from "../middleware/authMiddleware.js"
import { addDepartment,getDepartments,getDepartment,deleteDepartment,updateDepartment } from "../controllers/departmentController.js"

const router = express.Router()

router.get("/",authmiddleWare, getDepartments)
router.post("/add",authmiddleWare, addDepartment)
router.get("/:id",authmiddleWare, getDepartment)
router.put("/:id",authmiddleWare, updateDepartment)
router.delete("/:id",authmiddleWare, deleteDepartment)


export default router