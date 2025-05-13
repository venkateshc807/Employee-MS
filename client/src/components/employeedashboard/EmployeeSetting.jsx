import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const EmployeeSetting = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [setting, setSetting] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading state (assuming loading state is dynamic)
        const timer = setTimeout(() => setLoading(false), 1000); // Mock delay to simulate loading
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting({ ...setting, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (setting.newPassword !== setting.confirmPassword) {
            setError("Password not matched");
        } else {
            try {
                const response = await axios.put(
                    "https://employee-backend-ten-theta.vercel.app/api/setting/change-password",
                    setting,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        },
                    }
                );
                if (response.data.success) {
                    navigate("/admin-dashboard/employees");
                    setError("");
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    setError(error.response.data.error);
                }
            }
        }
    };

    return (
        <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
            <h2 className='text-2xl font-bold mb-6'>
                {loading ? <Skeleton width={150} /> : 'Change Password'}
            </h2>

            <p className='text-red-500'>{error}</p>

            {loading ? (
                <div>
                    <Skeleton height={40} className="mb-4" />
                    <Skeleton height={40} className="mb-4" />
                    <Skeleton height={40} className="mb-4" />
                    <Skeleton height={50} />
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='text-sm font-medium text-gray-700'>
                            Old Password
                        </label>

                        <input
                            type="password"
                            name='oldPassword'
                            placeholder='Enter old Password'
                            onChange={handleChange}
                            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                            required
                        />
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>
                            New Password
                        </label>

                        <input
                            type="password"
                            name='newPassword'
                            placeholder='Enter New Password'
                            onChange={handleChange}
                            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                            required
                        />
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name='confirmPassword'
                            placeholder='Confirm Password'
                            onChange={handleChange}
                            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                            required
                        />
                    </div>

                    <button
                        type='submit'
                        className='w-full mt-6 bg-teal-700 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>
                        Change Password
                    </button>
                </form>
            )}
        </div>
    );
};

export default EmployeeSetting;
