import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import departmentRouter from "./routes/departmentRoutes.js";
import employeRouter from "./routes/employeRoute.js";
import connectToDatabase from "./db/db.js";
import salaryRouter from "./routes/salaryRoute.js";
import leaveRouter from "./routes/leaveRoute.js";
import settingRouter from "./routes/settingRoute.js";
import dashBoardRouter from "./routes/dashBoard.js";

connectToDatabase();
const app = express();

// Allow all paths under the frontend domain (not just '/login')
app.use(cors({
  origin: "https://ems-beta-one.vercel.app",  // Update to allow the entire frontend domain
  credentials: true
}));

app.use(express.json());
app.use(express.static('public/uploads'));

app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/setting", settingRouter);
app.use("/api/dashboard", dashBoardRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server walking successfully in port ${process.env.PORT}`);
});
