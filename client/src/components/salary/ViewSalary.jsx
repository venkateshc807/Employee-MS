import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ViewSalary = () => {
    const [salaries, setSalaries] = useState(null);
    const [filterdSalaries, setFilteredSalaries] = useState(null);
    const { id } = useParams();
    let sno = 1;
    const { user } = useAuth();

    const fetchSalaries = async () => {
        try {
            const response = await axios.get(
                `https://employee-backend-ten-theta.vercel.app/api/salary/${id}/${user.role}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            if (response.data.success) {
                setSalaries(response.data.salary);
                setFilteredSalaries(response.data.salary);
            } else {
                console.warn('Success false from backend');
            }
        } catch (error) {
            console.error('Error fetching salaries:', error.message);
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchSalaries();
    }, []);

    const filterSalaries = (e) => {
        const q = e.target.value;
        const filteredRecords = salaries.filter((item) =>
            item.employeeId?.employeeId?.toLowerCase().includes(q.toLowerCase())
        );
        setFilteredSalaries(filteredRecords);
    };

    return (
        <>
            {filterdSalaries === null ? (
                <div className="p-5">
                    <Skeleton width="80%" height={30} />
                    <Skeleton count={5} height={20} />
                    <Skeleton count={10} height={40} />
                </div>
            ) : (
                <div className="overflow-x-auto p-5">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Salary History</h2>
                    </div>

                    <div className="flex justify-end my-3">
                        <input
                            type="text"
                            placeholder="Search by Emp ID"
                            className="border px-2 rounded-md py-0.5 border-gray-300"
                            onChange={filterSalaries}
                        />
                    </div>

                    {filterdSalaries.length > 0 ? (
                        <table className="w-full text-sm text-left text-white">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                                <tr>
                                    <th className="px-6 py-3">Sl No</th>
                                    <th className="px-6 py-3">Emp ID</th>
                                    <th className="px-6 py-3">Salary</th>
                                    <th className="px-6 py-3">Allowance</th>
                                    <th className="px-6 py-3">Deduction</th>
                                    <th className="px-6 py-3">Total</th>
                                    <th className="px-6 py-3">Pay Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterdSalaries.map((salary) => (
                                    <tr
                                        key={salary._id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <td className="px-6 py-3">{sno++}</td>
                                        <td className="px-6 py-3">{salary.employeeId.employeeId}</td>
                                        <td className="px-6 py-3">{salary.basicSalary}</td>
                                        <td className="px-6 py-3">{salary.allowances}</td>
                                        <td className="px-6 py-3">{salary.deductions}</td>
                                        <td className="px-6 py-3">{salary.netSalary}</td>
                                        <td className="px-6 py-3">
                                            {new Date(salary.payDate).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>No Records</div>
                    )}
                </div>
            )}
        </>
    );
};

export default ViewSalary;
