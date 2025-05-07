import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

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

  return <div>Loading...</div>;
};

export default RedirectBasedOnRole;