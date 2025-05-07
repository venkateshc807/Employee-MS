import Department from "../models/DepartmentModel.js";


const getDepartments = async(req,res)=>{
    try {
        const departments = await Department.find()
        return res.status(200).json({success:true, departments})
    } catch (error) {
        return res.status(500).json({success:false, error:"Get department server error"})
    }
}

const addDepartment = async(req,res) =>{

    try {
        const {dep_name, description} = req.body
        const newDep = new Department({
            dep_name,
            description
        })
        await newDep.save()
        return res.status(200).json({success:true, department: newDep})
    } catch (error) {
        return res.status(500).json({success:false, error:"Add department server error"})
    }
   
}

const getDepartment = async(req,res) =>{
      try {
        const {id} = req.params
        const department = await Department.findById(id)
        return res.status(200).json({success:true, department})
    } catch (error) {
        return res.status(500).json({success:false, error:"Get department server error"})
    }    
}


const updateDepartment = async(req,res) =>{
        try {
            const {id} = req.params
            const{dep_name,description} = req.body
            const updateDep = await Department.findByIdAndUpdate({_id: id},{
                dep_name: dep_name,
                description: description
            })
            return res.status(200).json({success:true, department:dep_name})
        } catch (error) {
            return res.status(500).json({success:false, error:"Edit department server error"})
        }  
}

const deleteDepartment = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedDep = await Department.findById(id);
      await deletedDep.deleteOne()
  
      if (!deletedDep) {
        return res.status(404).json({ success: false, error: "Department not found" });
      }
  
      return res.status(200).json({ success: true, message: "Department deleted successfully" });
    } catch (error) {
      console.error("Delete department error:", error);
      return res.status(500).json({ success: false, error: "Delete department server error" });
    }
  };
  


export {addDepartment , getDepartments, getDepartment,updateDepartment,deleteDepartment};