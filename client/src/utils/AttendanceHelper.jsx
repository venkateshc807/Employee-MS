import axios from 'axios';
import React from 'react';

export const columns = [
  {
    name: "Sl No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "160px",
  },
  {
    name: "Employee ID",
    selector: (row) => row.employeeId,
    sortable: true,
    width: "160px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "130px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
  },
];

export const AttendanceHelper = ({ status, employeeId, statusChange }) => {

  const markEmployee = async(status, employeeId)=>{
    const response = await axios.put(`http://localhost:5000/api/attendance/update/${employeeId}`,{status},{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
    if(response.data.success){
      statusChange()
    }
  }

  return (
    <div className="p-2">
      {status == null ? (
        <div className="flex flex-wrap gap-3">
          <button onClick={()=> markEmployee("present", employeeId)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-all duration-200">
            Present
          </button>
          <button  onClick={()=> markEmployee("absent", employeeId)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-all duration-200">
            Absent
          </button>
          <button  onClick={()=> markEmployee("sick", employeeId)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition-all duration-200">
            Sick
          </button>
          <button  onClick={()=> markEmployee("leave", employeeId)} 
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition-all duration-200">
            Leave
          </button>
        </div>
      ) : (
        <p className="bg-gray-100 w-24 text-center py-2 rounded shadow">
          {status}
        </p>
      )}
    </div>
  );
};
