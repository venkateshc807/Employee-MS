import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from "axios";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete = async () => {
    await fetchDepartments();
  };

  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/department', {
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

        setDepartments(data);
        setFilteredDepartments(data);
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

  // Skeleton loader JSX for table
  const SkeletonTable = () => {
    return (
      <div className='mt-6 space-y-4'>
        {Array(5).fill().map((_, idx) => (
          <div key={idx} className="flex justify-between p-4 border border-gray-200 rounded shadow-sm">
            <Skeleton width={40} height={20} />
            <Skeleton width={200} height={20} />
            <Skeleton width={100} height={20} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
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
            disabled={depLoading}
          />
          <Link className='px-4 py-1 rounded text-white bg-teal-600' to="/admin-dashboard/add-department">
            Add New Department
          </Link>
        </div>

        {depLoading ? (
          <SkeletonTable />
        ) : (
          <div className='mt-6'>
            <DataTable
              columns={columns}
              data={filteredDepartments}
              pagination
              highlightOnHover
            />
          </div>
        )}
      </div>
    </>
  );
};

export default DepartmentList;
