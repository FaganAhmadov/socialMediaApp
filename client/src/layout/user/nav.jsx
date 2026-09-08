import React from 'react';
import { logout } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const { message } = await logout();
      toast.success(message);
      navigate('/login');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-3 py-3 sm:px-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xl font-extrabold text-blue-600 sm:text-2xl">
            SocialFlow
          </div>

          <button
            onClick={logoutHandler}
            className="rounded-full bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 lg:hidden"
          >
            Logout
          </button>
        </div>

        <div className="w-full lg:mx-8 lg:max-w-xl lg:flex-1">
          <input
            type="text"
            placeholder="Search friends, posts..."
            className="w-full rounded-full border border-gray-200 bg-gray-100 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button onClick={logoutHandler} className="rounded-full bg-blue-600 px-4 py-2 font-medium text-white shadow hover:bg-blue-700">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;