import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/auth.service';

const Register = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const inpHandler = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }
    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(data)
            navigate('/')
        } catch (error) {
            console.log(error, 'error');
        }
    }
    return (
        <div className="min-h-screen bg-gradient from-purple-100 via-white to-blue-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
                        Create Account;
                    </h1>

                    <p className="text-gray-500">Join our modern social media community today.</p>
                </div>

                <form className="space-y-4" onSubmit={formSubmit}>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Username;
                        </label>

                        <input
                            onChange={inpHandler}
                            name='username'
                            type="text"
                            placeholder="Choose a username"
                            className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email;
                        </label>

                        <input
                            onChange={inpHandler}
                            name='email'
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password;
                        </label>

                        <input
                            onChange={inpHandler}
                            name='password'
                            type="password"
                            placeholder="Create a password"
                            className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Confirm Password;
                        </label>

                        <input
                            onChange={inpHandler}
                            name='confirmPassword'
                            type="password"
                            placeholder="Confirm your password"
                            className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-3 rounded-2xl font-semibold hover:bg-purple-700 transition shadow-lg shadow-purple-200"
                    >
                        Create Account;
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?
                    <Link to="/login" className="text-purple-600 font-semibold hover:underline ml-1">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;