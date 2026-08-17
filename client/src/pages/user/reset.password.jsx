import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { checkToken, resetPassword } from '../../services/auth.service';
import Loader from '../../components/ui/loader';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [isValidToken, setIsValidToken] = useState(false)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const [resetData, setResetData] = useState({
        newpassword: '',
        confirmpassword: '',
    });

    const formSubmit = async (e) => {
        e.preventDefault();
        if (resetData.newpassword !== resetData.confirmpassword) {
            return alert('Passwords do not match');
        }

        try {
            const token = searchParams.get('token')
            await resetPassword(resetData, token)
            alert('Password reset successfully');
        } catch (error) {
            alert(error.response?.data?.message || 'Reset password failed');
        }

    };

    useEffect(() => {
        (async (params) => {
            try {
                const token = searchParams.get('token')
                const { message } = await checkToken(token)
                toast.success(message)
                setIsValidToken(true)
            } catch (error) {
                toast.error(error)
                navigate('/')
            }

        })()
    }, [])

    if (!isValidToken) {
        return <Loader />
    }

    return (
        <div className="min-h-screen bg-gradient from-blue-100 via-white to-purple-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                        🔑
                    </div>

                    <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
                        Reset Password
                    </h1>

                    <p className="text-gray-500 leading-relaxed">
                        Create a new secure password for your account.
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={formSubmit}>
                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            New Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={resetData.newpassword}
                            onChange={(e) =>
                                setResetData({
                                    ...resetData,
                                    newpassword: e.target.value,
                                })
                            }
                            className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            placeholder="Confirm new password"
                            value={resetData.confirmpassword}
                            onChange={(e) =>
                                setResetData({
                                    ...resetData,
                                    confirmpassword: e.target.value,
                                })
                            }
                            className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                    >
                        Reset Password
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

export default ResetPassword;