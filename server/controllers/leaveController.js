import path from "path"
import Employee from "../models/EmployeeModel.js"
import Leave from "../models/LeaveModel.js"


const addLeave = async (req, res) => {
    try {
      const { userId, leaveType, startDate, endDate, reason } = req.body;
  
      if (!userId || !leaveType || !startDate || !endDate || !reason) {
        return res.status(400).json({ success: false, error: "All fields are required" });
      }
  
      const employee = await Employee.findOne({ userId });
  
      if (!employee) {
        return res.status(404).json({ success: false, error: "Employee not found for given userId" });
      }
  
      const newLeave = new Leave({
        employeeId: employee._id,
        leaveType,
        startDate,
        endDate,
        reason,
        status: "Pending", // Default status
      });
  
      await newLeave.save();
  
      return res.status(200).json({ success: true, message: "Leave added successfully" });
    } catch (error) {
      console.error("AddLeave Error:", error.message);
      return res.status(500).json({ success: false, error: "Leave Add Server error" });
    }
  };
  


import mongoose from "mongoose";

const getLeave = async (req, res) => {
  try {
    const { id } = req.params;
    let leaves = [];



    // First try to find by employeeId directly (in case Admin sends actual employee._id)
    if (mongoose.Types.ObjectId.isValid(id)) {
      leaves = await Leave.find({ employeeId: id });

    }

    // If no leaves found, treat it as userId and try to find the employee
    if (!leaves || leaves.length === 0) {
      const employee = await Employee.findOne({ userId: new mongoose.Types.ObjectId(id) });


      if (!employee) {
        return res.status(404).json({ success: false, error: "Employee not found for given userId" });
      }

      leaves = await Leave.find({ employeeId: employee._id });
    }

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error("GetLeave Error:", error.message);
    return res.status(500).json({ success: false, error: "Server error while fetching leave data" });
  }
};

  

const getLeaves = async(req,res) =>{
    try {
        const leaves = await Leave.find().populate({
            path : "employeeId",
            populate: [
               { path: "department",
                select: "dep_name"
               },
               {
                path: "userId",
                select : "name"
               }
            ]
    })
        return res.status(200).json({success: true, leaves})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success: false, error: "Get Leave Server error"})
    }
}


const getLeaveDetail = async(req, res) =>{
    try {
        const {id} = req.params
        const leave = await Leave.findById(id).populate({
            path : "employeeId",
            populate: [
               { path: "department",
                select: "dep_name"
               },
               {
                path: "userId",
                select : "name profileImage"
               }
            ]
    })

        return res.status(200).json({success: true, leave})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success: false, error: "Get Leave Server error"})
    }

}

const updateLeave = async(req,res) =>{
    try{
        const {id} = req.params
        const leave = await Leave.findByIdAndUpdate({_id: id}, {status: req.body.status})

        if(!leave){
            return res.status(404).json({success: false, error: "Leave not founded"})
        }
        return res.status(200).json({success: true})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success: false, error: "Update Leave Server error"})
    }
}


export { addLeave, getLeave,getLeaves,getLeaveDetail,updateLeave }