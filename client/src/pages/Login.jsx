import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        alert("Successfully logged in");
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Server error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-teal-600 to-gray-100 px-4">
      <h1 className="text-white text-4xl font-extrabold mb-8 font-anton tracking-wide text-center">
        Employee Management System
      </h1>

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center font-sans">
          {loading ? <Skeleton width={150} /> : 'Login'}
        </h2>

        {error && (
          <p className="text-red-500 text-center text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            {loading ? (
              <Skeleton height={40} />
            ) : (
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            {loading ? (
              <Skeleton height={40} />
            ) : (
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            {loading ? (
              <Skeleton width={200} height={20} />
            ) : (
              <>
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox rounded" />
                  <span className="ml-2">Remember me</span>
                </label>
                <a href="#" className="text-teal-600 hover:underline">
                  Forgot password?
                </a>
              </>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 ${
              loading ? "bg-teal-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
            } text-white font-semibold rounded-lg transition duration-200`}
          >
            {loading ? <Skeleton width={80} /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
