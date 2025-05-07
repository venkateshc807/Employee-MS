import path from "path";
import Employee from "../models/EmployeeModel.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import multer from "multer";
import Department from "../models/DepartmentModel.js" 


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
        } = req.body;

        // Validation: Check if all required fields are provided
        if (!name || !email || !employeeId || !dob || !gender || !salary || !password || !role) {
            return res.status(400).json({ success: false, error: "Please provide all required fields." });
        }

        // Validation: Check if employeeId is not empty
        if (!employeeId || employeeId.trim() === "") {
            return res.status(400).json({ success: false, error: "employeeId is required and cannot be empty" });
        }

        // Check if user with the same email already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: "User already registered in Employee list" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new User instance
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : "",  // File upload logic
        });

        // Save the new user
        const savedUser = await newUser.save();

        // Create a new Employee instance
        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
        });

        // Save the employee
        await newEmployee.save();

        return res.status(200).json({ success: true, message: "Employee created successfully" });

    } catch (error) {
        console.error("Full Error:", error); // This shows validation or Mongo errors in detail
        return res.status(500).json({ success: false, error: "Server error while adding the employee" });
    }
}

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate("userId", { password: 0 }).populate("department");
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Get Employees server error" });
    }
}


const getEmployee = async (req, res) => {
    const {id} = req.params;

    try {
        let employee;
        employee = await Employee.findById({_id : id}).populate("userId", { password: 0 }).populate("department");
        if(!employee){
            employee = await Employee.findOne({userId : id}).populate("userId", { password: 0 }).populate("department");
        }
        return res.status(200).json({ success: true, employee });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Get Employee server error" });
    }

}


const updateEmployee = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name,
        maritalStatus,
        designation,
        department,
        salary,
      } = req.body;
  
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({ success: false, error: "Employee not found" });
      }
  
      const user = await User.findById(employee.userId);
      if (!user) {
        return res.status(404).json({ success: false, error: "User not found" });
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        employee.userId,
        { name },
        { new: true }
      );
  
      const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        { maritalStatus, designation, salary, department },
        { new: true }
      );
  
      return res.status(200).json({ success: true, message: "Employee Updated" });
    } catch (error) {
      console.error("Update Error:", error);
      return res.status(500).json({ success: false, error: "Update Employee server error" });
    }
  };
  

  const fetchEmployeesByDepId = async(req,res)=>{
    const {id} = req.params;

    try {
        const employees = await Employee.find({department : id})
        return res.status(200)
        .json({ success: true, employees });
    } catch (error) {
        return res.status(500)
        .json({ success: false, error: "Get Employee by Dep ID server error" });
    }
  }




export { addEmployee, upload, getEmployees,getEmployee,updateEmployee,fetchEmployeesByDepId };

