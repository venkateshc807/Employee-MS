import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/authContext';

const LeaveList = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState(null);
  const { id } = useParams();
  let sno = 1;

  const fetchLeaves = async (employeeId) => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/api/leave/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setLeaves(response.data.leaves);
      } else {
        console.warn("Success false from backend");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    if (user?.role === 'employee') {
      fetchLeaves(user._id);
    } else if (id) {
      fetchLeaves(id);
    }

    console.log("User:", user);
    console.log("Route ID:", id);
  }, [user, id]);

  if (!user) {
    return <div className='text-center mt-10 text-lg'>Checking user info...</div>;
  }

  if (!leaves) {
    return <div className='text-center mt-10 text-lg'>Loading leaves...</div>;
  }

  return (
    <div className='p-6'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Leaves</h3>
        <p className='text-sm text-gray-500 mt-1'>Role: {user?.role || 'Unknown'}</p>
      </div>

      <div className='flex justify-between items-center mt-4'>
        <input
          className='px-4 py-1 border border-gray-300 rounded'
          type="text"
          placeholder='Search by Department name'
        />
        {user?.role === "employee" && (
          <Link
            className='px-4 py-1 rounded text-white bg-teal-600'
            to="/employee-dashboard/add-leave"
          >
            Add New Leave
          </Link>
        )}
      </div>

      {leaves.length === 0 ? (
        <div className='text-center text-lg mt-10'>No leaves found.</div>
      ) : (
        <table className='w-full text-sm text-left text-white mt-6'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
            <tr>
              <th className='px-6 py-3'>Sl No</th>
              <th className='px-6 py-3'>Leave Type</th>
              <th className='px-6 py-3'>From</th>
              <th className='px-6 py-3'>To</th>
              <th className='px-6 py-3'>Description</th>
              <th className='px-6 py-3'>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                <td className='px-6 py-3'>{sno++}</td>
                <td className='px-6 py-3'>{leave.leaveType}</td>
                <td className='px-6 py-3'>{new Date(leave.startDate).toLocaleDateString()}</td>
                <td className='px-6 py-3'>{new Date(leave.endDate).toLocaleDateString()}</td>
                <td className='px-6 py-3'>{leave.reason}</td>
                <td className='px-6 py-3'>{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaveList;
