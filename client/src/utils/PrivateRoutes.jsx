import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
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
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
