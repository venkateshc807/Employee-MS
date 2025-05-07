import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete = async () => {
    // After delete, re-fetch the departments to keep the list updated
    await fetchDepartments();
  };

  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get('https://employee-backend-ten-theta.vercel.app/api/department', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.departments.map(dep => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: <DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete} />,
        }));

        setDepartments(data); // Update the departments list
        setFilteredDepartments(data); // Ensure the filtered list is also updated
      }
    } catch (error) {
      console.error("Failed to fetch departments:", error);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setDepLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const filtereDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records);
  };

  return (
    <>
      {depLoading ? (
        <div className='text-center text-lg font-semibold py-10'>Loading...</div>
      ) : (
        <div className='p-5'>
          <div className='text-center'>
            <h3 className='text-2xl font-bold'>Manage Departments</h3>
          </div>
          <div className='flex justify-between items-center mt-4'>
            <input
              className='px-4 py-1 border border-gray-300 rounded'
              type="text"
              placeholder='Search by Department name'
              onChange={filtereDepartments}
            />
            <Link className='px-4 py-1 rounded text-white bg-teal-600' to="/admin-dashboard/add-department">
              Add New Department
            </Link>
          </div>

          <div className='mt-6'>
            <DataTable
              columns={columns}
              data={filteredDepartments}
              pagination
              highlightOnHover
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
