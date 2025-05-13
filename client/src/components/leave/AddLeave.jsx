import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AddLeave = () => {
    const { user } = useAuth();
    const [leave, setLeave] = useState({
        userId: user._id,
    });
    const [loading, setLoading] = useState(true);  // Track the loading state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave((prevState) => ({ ...prevState, [name]: value }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `http://localhost:5000/api/leave/add`,
                leave,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            console.log(response.data);
            if (response.data.success) {
                navigate("/employee-dashboard/leaves/:id");
            }
        } catch (error) {
            console.error("Failed to fetch departments:", error);
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);  // Simulate loading completion
        }, 1000);  // Adjust the time to simulate the actual loading delay

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-6'>
                {loading ? <Skeleton width={200} /> : 'Request For Leave'}
            </h2>

            {loading ? (
                <div>
                    <Skeleton height={40} className="mb-4" />
                    <Skeleton height={40} className="mb-4" />
                    <Skeleton height={40} className="mb-4" />
                    <Skeleton height={50} />
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col space-y-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Leave Type
                            </label>
                            <select
                                name="leaveType"
                                onChange={handleChange}
                                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                required>
                                <option value="">Select Leave Type</option>
                                <option value="Sick Leave">Sick Leave</option>
                                <option value="Casual Leave">Casual Leave</option>
                                <option value="Annual Leave">Annual Leave</option>
                            </select>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {/* From Date */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    From Date
                                </label>
                                <input
                                    type="date"
                                    name='startDate'
                                    onChange={handleChange}
                                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                    required />
                            </div>

                            {/* To Date */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    To Date
                                </label>
                                <input
                                    type="date"
                                    name='endDate'
                                    onChange={handleChange}
                                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                    required />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Description
                            </label>
                            <textarea
                                name="reason"
                                placeholder='Reason'
                                onChange={handleChange}
                                className='w-full border border-gray-700'></textarea>
                        </div>
                    </div>

                    <button
                        type='submit'
                        className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>
                        Request Leave
                    </button>
                </form>
            )}
        </div>
    );
};

export default AddLeave;
