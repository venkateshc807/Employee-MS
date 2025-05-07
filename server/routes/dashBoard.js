import express from "express"
import authMiddleWare from "../middleware/authMiddleware.js"
import { getSummary } from "../controllers/dashboardController.js"


const router =  express.Router()

router.get("/summary",authMiddleWare, getSummary)


export default router