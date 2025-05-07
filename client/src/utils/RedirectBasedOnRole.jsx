import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const RedirectBasedOnRole = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user?.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (user?.role === 'employee') {
        navigate('/employee-dashboard');
      } else {
        navigate('/employee-dashboard');
      }
    }
  }, [user, loading, navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-[300px]">
        <Skeleton height={30} count={1} style={{ marginBottom: 12 }} />
        <Skeleton height={20} count={2} />
        <div className="mt-4">
          <Skeleton height={40} width={100} />
        </div>
      </div>
    </div>
  );
};

export default RedirectBasedOnRole;
