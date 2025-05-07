import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LeaveDetail = () => {
    const { id } = useParams();
    const [leave, setLeave] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeave = async () => {
            try {
                const response = await axios.get(`https://employee-backend-ten-theta.vercel.app/api/leave/detail/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    setLeave(response.data.leave);
                }
            } catch (error) {
                console.error("Failed to fetch leave details:", error);
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchLeave();
    }, [id]);

    const changeStatus = async (id, status) => {
        try {
            const response = await axios.put(`https://employee-backend-ten-theta.vercel.app/api/leave/${id}`, { status }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                navigate("/admin-dashboard/leaves");
            }
        } catch (error) {
            console.error("Failed to update leave status:", error);
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
                <Skeleton height={30} className="mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Skeleton circle height={150} width={150} />
                    <div>
                        <Skeleton height={30} className="mb-3" />
                        <Skeleton height={30} className="mb-3" />
                        <Skeleton height={30} className="mb-3" />
                        <Skeleton height={30} className="mb-3" />
                        <Skeleton height={30} className="mb-3" />
                        <Skeleton height={30} className="mb-3" />
                        <Skeleton height={30} className="mb-3" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {leave ? (
                <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
                    <h2 className='text-2xl font-bold mb-8 text-center'>Leave Details</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                            <img
                                src={`https://employee-backend-ten-theta.vercel.app/${leave?.employeeId?.userId?.profileImage}`}
                                alt={`${leave?.employeeId?.userId?.name}'s profile`}
                                className='rounded-full border w-72'
                            />
                        </div>
                        <div>
                            <div className='flex space-x-3 mb-2'>
                                <p className='text-lg font-bold'>Name : </p>
                                <p className='font-medium'>{leave?.employeeId?.userId?.name}</p>
                            </div>
                            <div className='flex space-x-3 mb-2'>
                                <p className='text-lg font-bold'>Employee ID : </p>
                                <p className='font-medium'>{leave?.employeeId?.employeeId}</p>
                            </div>
                            <div className='flex space-x-3 mb-2'>
                                <p className='text-lg font-bold'>Leave type : </p>
                                <p className='font-medium'>{leave?.leaveType}</p>
                            </div>
                            <div className='flex space-x-3 mb-2'>
                                <p className='text-lg font-bold'>Reason : </p>
                                <p className='font-medium'>{leave?.reason}</p>
                            </div>
                            <div className='flex space-x-3 mb-2'>
                                <p className='text-lg font-bold'>Department : </p>
                                <p className='font-medium'>{leave?.employeeId?.department?.dep_name}</p>
                            </div>
                            <div className='flex space-x-3 mb-2'>
                                <p className='text-lg font-bold'>Start Date : </p>
                                <p className='font-medium'>{new Date(leave?.startDate).toLocaleDateString()}</p>
                            </div>
                            <div className='flex space-x-3 mb-2'>
                                <p className='text-lg font-bold'>End Date : </p>
                                <p className='font-medium'>{new Date(leave?.endDate).toLocaleDateString()}</p>
                            </div>
                            <div className='flex space-x-3 mb-2'>
                                <p className='text-lg font-bold'>
                                    {leave.status === "Pending" ? "Action" : "Status : "}
                                </p>
                                {leave.status === "Pending" ? (
                                    <div className='flex space-x-2'>
                                        <button className='px-2 py-0.5 bg-teal-400 hover:bg-teal-500'
                                            onClick={() => changeStatus(leave._id, "Approved")}>Approve</button>
                                        <button className='px-2 py-0.5 bg-red-400 hover:bg-red-500'
                                            onClick={() => changeStatus(leave._id, "Rejected")}>Reject</button>
                                    </div>
                                ) : (
                                    <p className='font-medium'>{leave.status}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>No leave details found.</div>
            )}
        </>
    );
};

export default LeaveDetail;
