import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import defaultAttendance from "../middleware/defaultAttendance.js"
import { attendanceReport, getAttendance, updateAttendance } from "../controllers/attendanceController.js"

const router = express.Router()

router.get("/",authMiddleware, defaultAttendance, getAttendance)
router.put("/update/:employeeId",authMiddleware, updateAttendance)
router.get("/report",authMiddleware, attendanceReport)

export default router