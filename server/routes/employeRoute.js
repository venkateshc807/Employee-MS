import express from "express";
import authmiddleWare from "../middleware/authMiddleware.js";
import { addEmployee, upload,getEmployees,getEmployee,updateEmployee,fetchEmployeesByDepId } from "../controllers/employeeController.js";

const router = express.Router();

// Route to create an employee (POST)

router.get("/",authmiddleWare,getEmployees)
router.post("/add", authmiddleWare, upload.single("profileImage"), addEmployee);

// Uncomment or implement other routes as needed:
router.get("/:id", authmiddleWare, getEmployee);
router.put("/:id", authmiddleWare, updateEmployee);
router.get("/department/:id", authmiddleWare, fetchEmployeesByDepId);

export default router;
