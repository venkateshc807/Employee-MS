import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { EmployeeButtons, columns } from '../../utils/EmployeHelper'; // Correct import
import DataTable from "react-data-table-component";
import axios from "axios";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const EmployeList = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeLoading, setEmployeeLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmployeeLoading(true);
      try {
        const response = await axios.get('https://employee-backend-ten-theta.vercel.app/api/employee', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data.success) {
          let sno = 1;
          const data = await response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: <img width={40} className='rounded-full' src={`https://employee-backend-ten-theta.vercel.app/${emp.userId.profileImage}`} />,
            action: (<EmployeeButtons Id={emp._id} />)
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        } else {
          console.error("Employees data not found in response");
        }
      } catch (error) {
        console.error("Failed to fetch employees:", error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmployeeLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(records);
  };

  return (
    <div className='p-6'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Employees</h3>
      </div>
      <div className='flex justify-between items-center mt-4'>
        <input
          className='px-4 py-1 border border-gray-300 rounded'
          type="text"
          placeholder='Search by Department name'
          onChange={handleFilter}
        />
        <Link className='px-4 py-1 rounded text-white bg-teal-600' to="/admin-dashboard/add-employee">
          Add New Employee
        </Link>
      </div>

      <div className='mt-4'>
        {employeeLoading ? (
          <div className="text-center">
            {/* Skeleton loading for the table */}
            <Skeleton count={5} height={50} width="100%" className="mb-4" />
            <Skeleton count={5} height={50} width="30%" className="mb-4" />
            <Skeleton count={5} height={50} width="20%" className="mb-4" />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredEmployees}
            pagination
            highlightOnHover
            responsive
          />
        )}
      </div>
    </div>
  );
};

export default EmployeList;
