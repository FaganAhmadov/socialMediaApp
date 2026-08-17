import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../services/auth.service';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [data, setData] = useState({ email: '' });

    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            const { message } = await forgotPassword(data)
            toast.success(message)
        } catch (error) {
            toast.error(error)
        }

    };

    return (
        <div className="min-h-screen bg-gradient from-blue-100 via-white to-purple-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                        🔒
                    </div>

                    <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
                        Forgot Password
                    </h1>

                    <p className="text-gray-500 leading-relaxed">
                        Enter your email address and we’ll send you a password reset link.
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={formSubmit}>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                    >
                        Send Reset Link
                    </button>
                </form>

                {/* Footer */}
                <div className="text-center mt-6 space-y-3">
                    <p className="text-sm text-gray-500">
                        Remember your password?

                        <Link
                            to="/login"
                            className="text-blue-600 font-semibold hover:underline ml-1"
                        >
                            Back to Login
                        </Link>
                    </p>

                    <p className="text-sm text-gray-500">
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
        </div>
    );
};

export default ForgotPassword;