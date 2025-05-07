import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState({ dep_name: '', description: '' });
  const [depLoading, setDepLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(`https://employee-backend-ten-theta.vercel.app/api/department/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.success) {
          setDepartment(response.data.department);
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

    fetchDepartments();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`https://employee-backend-ten-theta.vercel.app/api/department/${id}`, department, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
        <h3 className='text-2xl font-bold mb-6'>
          {depLoading ? <Skeleton width={200} /> : 'Edit Department'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="dep_name" className='text-sm font-medium text-gray-700'>
              Department Name
            </label>
            {depLoading ? (
              <Skeleton height={40} className='mt-1 rounded' />
            ) : (
              <input
                type="text"
                name='dep_name'
                onChange={handleChange}
                value={department.dep_name}
                placeholder='Enter Dep name'
                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                required
              />
            )}
          </div>

          <div className='mt-3'>
            <label htmlFor="description" className='block text-sm font-medium text-gray-700'>
              Description
            </label>
            {depLoading ? (
              <Skeleton height={80} className='mt-1 rounded' />
            ) : (
              <textarea
                name="description"
                value={department.description}
                onChange={handleChange}
                placeholder='Description'
                className='mt-1 block w-full border border-gray-300 rounded-md'
                rows="4"
              />
            )}
          </div>

          <button
            type='submit'
            className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
            disabled={depLoading}
          >
            {depLoading ? <Skeleton width={120} height={20} /> : 'Update Department'}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditDepartment;
