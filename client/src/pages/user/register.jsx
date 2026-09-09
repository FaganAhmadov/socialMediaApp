import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../../services/auth.service';

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const inpHandler = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const formSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await register(data);
            const successMessage = response?.message || 'User created successfully';
            toast.success(successMessage);

            setTimeout(() => {
                navigate('/');
            }, 350);
        } catch (error) {
            const message = typeof error === 'string' ? error : error?.message || 'Something went wrong';
            toast.error(message);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient from-purple-100 via-white to-blue-100 p-4">
            <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-2xl">
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-3xl font-extrabold text-gray-800">
                        Create Account
                    </h1>

                    <p className="text-gray-500">Join our modern social media community today.</p>
                </div>

                <form className="space-y-4" onSubmit={formSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                First Name
                            </label>

                            <input
                                onChange={inpHandler}
                                name='firstName'
                                type="text"
                                placeholder="First name"
                                className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Last Name
                            </label>

                            <input
                                onChange={inpHandler}
                                name='lastName'
                                type="text"
                                placeholder="Last name"
                                className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Username
                        </label>

                        <input
                            onChange={inpHandler}
                            name='username'
                            type="text"
                            placeholder="Choose a username"
                            className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Email
                        </label>

                        <input
                            onChange={inpHandler}
                            name='email'
                            type="email"
                            placeholder="Enter your email"
                            className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Password
                        </label>

                        <input
                            onChange={inpHandler}
                            name='password'
                            type="password"
                            placeholder="Create a password"
                            className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Confirm Password
                        </label>

                        <input
                            onChange={inpHandler}
                            name='confirmPassword'
                            type="password"
                            placeholder="Confirm your password"
                            className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-2xl bg-purple-600 py-3 font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-700"
                    >
                        Create Account
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?
                    <Link to="/login" className="ml-1 font-semibold text-purple-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;