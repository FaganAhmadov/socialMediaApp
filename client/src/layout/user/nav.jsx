import React from 'react';
import { logout } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Navbar = () => {
  const navigate = useNavigate()
  const logoutHandler = async () => {
    try {
      const { message } = await logout()
      toast.success(message)
      navigate('/login')
    } catch (error) {
      toast.error(error)
    }
  }
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-extrabold text-blue-600">
          SocialMediaPro
        </div>

        <div className="hidden md:flex items-center gap-4 flex-1 max-w-xl mx-8">
          <input
            type="text"
            placeholder="Search friends, posts..."
            className="w-full px-4 py-2 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <button onClick={logoutHandler} className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 font-medium shadow">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;