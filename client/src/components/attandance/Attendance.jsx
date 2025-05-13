import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AttendanceHelper, columns } from '../../utils/AttendanceHelper';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredAttendance, setFilteredAttendance] = useState('');

  const statusChange = () =>{
    fetchAttendance()
  }


  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/attendance', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        let sno = 1;
        const data = await response.data.attendance.map((att) => ({
          employeeId: att.employeeId.employeeId,
          sno: sno++,
          department: att.employeeId.department.dep_name,
          name: att.employeeId.userId.name,
          action: (<AttendanceHelper status = {att.status} employeeId = { att.employeeId.employeeId } statusChange = {statusChange}/>)
        }));
        setAttendance(data);
        setFilteredAttendance(data);
      } else {
        console.error("Employees data not found in response");
      }
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleFilter = (e) => {
    const records = attendance.filter((emp) =>
      emp.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredAttendance(records);
  };

  return (
    <div className='p-6'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Attendance</h3>
      </div>
      <div className='flex justify-between items-center mt-4'>
        <input
          className='px-4 py-1 border border-gray-300 rounded'
          type="text"
          placeholder='Search by Department name'
          onChange={handleFilter}
        />
        <p className='text-2xl'>
          Mark Employees for <span
          className='text-2xl font-bold underline'>{new Date().toISOString().split('T')[0]}{" "}</span>
        </p>
        <Link className='px-4 py-1 rounded text-white bg-teal-600' to="/admin-dashboard/attendance-report">
          Attendance Report
        </Link>
      </div>

      <div className='mt-4'>
        {loading ? (
          <div className="text-center">
            {/* Skeleton loading for the table */}
            <Skeleton count={5} height={50} width="100%" className="mb-4" />
            <Skeleton count={5} height={50} width="30%" className="mb-4" />
            <Skeleton count={5} height={50} width="20%" className="mb-4" />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredAttendance}
            pagination
            highlightOnHover
            responsive
          />
        )}
      </div>
    </div>
  );
};

export default Attendance;

