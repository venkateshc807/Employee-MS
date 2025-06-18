import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SummaryCard from './SummaryCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  FaBuilding,
  FaUsers,
  FaMoneyCheckAlt,
  FaFileAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle
} from 'react-icons/fa';

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true); // 🔄 loading state

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("https://employee-backend-ten-theta.vercel.app/api/dashboard/summary", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setSummary(res.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        }
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-800">Dashboard Overview</h3>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {loading ? (
          Array(3).fill().map((_, index) => (
            <div key={index} className="p-4 bg-white rounded-xl shadow">
              <Skeleton height={30} width={30} circle />
              <Skeleton height={20} width="80%" className="mt-2" />
              <Skeleton height={24} width="50%" className="mt-2" />
            </div>
          ))
        ) : (
          <>
            <SummaryCard icon={<FaUsers />} text="Total Employees" number={summary.totalEmployees} color="bg-teal-600" />
            <SummaryCard icon={<FaBuilding />} text="Total Departments" number={summary.totalDepartments} color="bg-yellow-600" />
            <SummaryCard icon={<FaMoneyCheckAlt />} text="Monthly Salary" number={summary.totalSalary} color="bg-red-600" />
          </>
        )}
      </div>

      {/* Leave Section */}
      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold text-gray-700">Leave Details</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {loading ? (
            Array(4).fill().map((_, index) => (
              <div key={index} className="p-4 bg-white rounded-xl shadow">
                <Skeleton height={30} width={30} circle />
                <Skeleton height={20} width="80%" className="mt-2" />
                <Skeleton height={24} width="50%" className="mt-2" />
              </div>
            ))
          ) : (
            <>
              <SummaryCard icon={<FaFileAlt />} text="Leave Applications" number={summary.leaveSummary.appliedFor} color="bg-blue-600" />
              <SummaryCard icon={<FaCheckCircle />} text="Leave Approved" number={summary.leaveSummary.approved} color="bg-green-600" />
              <SummaryCard icon={<FaHourglassHalf />} text="Leave Pending" number={summary.leaveSummary.pending} color="bg-orange-500" />
              <SummaryCard icon={<FaTimesCircle />} text="Leave Rejected" number={summary.leaveSummary.rejected} color="bg-gray-600" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
