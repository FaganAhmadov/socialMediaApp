import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/auth.service';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate()
  const [loginData, setLoginData] = useState({
    emailorusername: '',
    password: ''
  })

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await login(loginData);
      toast.success(message);
      navigate('/');
    } catch (error) {
      console.log(error)
      toast.error(error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient from-blue-100 via-white to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
            Welcome Back
          </h1>

          <p className="text-gray-500">Login to continue your social journey.</p>
        </div>

        <form className="space-y-5" onSubmit={formSubmit} >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username or Email
            </label>

            <input
              type="text"
              placeholder="Enter username or email"
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setLoginData({ ...loginData, emailorusername: e.target.value })}
              value={loginData.emailorusername}
            // əvvəlki email və password dəyərləri silinməsin deyə (...)spread istifadə etdik
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline ml-1"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;