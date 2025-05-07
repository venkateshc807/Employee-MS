import axios from "axios"
import { Eye, Pencil, DollarSign, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const columns =[
    {
        name: "Sl No",
        selector : (row) => row.sno,
        width : "70px"
    },
    {
        name: "Name",
        selector : (row) => row.name,
        sortable: true,
        width: "160px"
    },
    {
      name: "Image",
      selector : (row) => row.profileImage,
       width: "100px"
  },
    {
        name: "Department",
        selector : (row) => row.dep_name,
         width: "130px"
    },
    {
      name: "DOB",
      selector : (row) => row.dob,
      sortable: true,
      width: "130px"
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center : "true"
  }, 

]

export const fetchDepartments = async (id) => {
  let departments = []
  try {
      const response = await axios.get('https://employee-backend-ten-theta.vercel.app/api/department', {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      });

      if (response.data.success) {
          departments = response.data.departments;
      }
  } catch (error) {
      console.error("Failed to fetch departments:", error);
      if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
      }
  }
  return departments;
};



export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-2">
      <button
        className="flex items-center gap-1 px-4 py-1 bg-teal-600 hover:bg-teal-700 text-white text-sm rounded-full shadow-md transition-all duration-200 hover:scale-105"
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
      >
        <Eye size={16} />
        View
      </button>

      <button
        className="flex items-center gap-1 px-4 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-full shadow-md transition-all duration-200 hover:scale-105"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
      >
        <Pencil size={16} />
        Edit
      </button>

      <button
        className="flex items-center gap-1 px-4 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-full shadow-md transition-all duration-200 hover:scale-105"
        onClick={()=> navigate(`/admin-dashboard/employees/salary/${Id}`)}
      >
        <DollarSign size={16} />
        Salary
      </button>

      <button
        className="flex items-center gap-1 px-4 py-1 bg-amber-600 hover:bg-amber-700 text-white text-sm rounded-full shadow-md transition-all duration-200 hover:scale-105"
       onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}>
        <Calendar size={16} />
        Leave
      </button>
    </div>
  );
};



//Employees for Salary Form


export const getEmployees = async (id) => {
  let employees = [];
  try {
    const response = await axios.get(`https://employee-backend-ten-theta.vercel.app/api/employee/department/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    console.log(response);

    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    console.error("Failed to fetch employees:", error); 
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
};



  