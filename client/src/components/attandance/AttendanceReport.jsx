import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({ limit, skip });
      if (dateFilter) {
        query.append("date", dateFilter);
      }

      const response = await axios.get(
        `https://employee-backend-ten-theta.vercel.app/api/attendance/report?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        if (skip === 0) {
          setReport(response.data.groupData);
        } else {
          setReport((prevData) => ({
            ...prevData,
            ...response.data.groupData,
          }));
        }
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [skip, limit, dateFilter]);

  const handlePrev = () => {
    if (skip >= limit) setSkip(skip - limit);
  };

  const handleNext = () => {
    setSkip(skip + limit);
  };

  return (
    <div className="p-4">
      <h2 className="text-center text-2xl font-bold mb-4">Attendance Report</h2>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Filter by Date:</label>
        <input
          type="date"
          className="border bg-gray-100 px-3 py-1 rounded"
          value={dateFilter}
          onChange={(e) => {
            setDateFilter(e.target.value);
            setSkip(0); // reset pagination on date change
          }}
        />
      </div>

      {loading ? (
        <div className="text-center text-lg font-semibold text-gray-600">Loading...</div>
      ) : Object.keys(report).length === 0 ? (
        <div className="text-center text-gray-500">No records found.</div>
      ) : (
        Object.entries(report).map(([date, records], index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{date}</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">S No.</th>
                  <th className="border px-4 py-2">Employee ID</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Department</th>
                  <th className="border px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                  {records.map((data, i) => (
                    <tr
                      key={data.employeeId || i}
                      className={data.status === "Absent" ? "bg-red-100 text-red-800" : ""}
                    >
                      <td className="border px-4 py-2">{i + 1}</td>
                      <td className="border px-4 py-2">{data.employeeId}</td>
                      <td className="border px-4 py-2">{data.employeeName}</td>
                      <td className="border px-4 py-2">{data.departmentName}</td>
                      <td className="border px-4 py-2">{data.status}</td>
                    </tr>
                  ))}
                </tbody>

            </table>
          </div>
        ))
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          disabled={skip === 0}
          className={`px-4 py-2 rounded ${
            skip === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AttendanceReport;
