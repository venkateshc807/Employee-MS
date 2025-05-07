import express from "express"
import authmiddleWare from "../middleware/authMiddleware.js"
import { changePassword } from "../controllers/settingController.js"



const router = express.Router()



router.put("/change-password",authmiddleWare, changePassword)

export default router