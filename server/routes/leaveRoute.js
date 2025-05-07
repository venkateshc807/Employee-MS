


import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { 
  addLeave,
  getLeave,
  getLeaves,
  getLeaveDetail,
  updateLeave 
} from "../controllers/leaveController.js";

const router = express.Router();

// Add new leave
router.post("/add", authMiddleware, addLeave);

// Get all leaves (admin-level route)
router.get("/", authMiddleware, getLeaves);

// Get specific leave details by leave ID
router.get("/detail/:id", authMiddleware, getLeaveDetail);

// Get leaves by employeeId or userId (dynamic route)
router.get("/:id", authMiddleware, getLeave);

// Update leave
router.put("/:id", authMiddleware, updateLeave);

export default router;
