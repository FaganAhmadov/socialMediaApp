import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-full lg:w-72">
      <div className="sticky top-24 rounded-3xl border bg-white p-5 shadow-sm">

        {/* Profile */}
        <div className="mb-6 flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/80?img=12"
            alt="profile"
            className="h-14 w-14 rounded-full object-cover"
          />

          <div>
            <h3 className="font-bold text-gray-800">
              Fagan Ahmadov
            </h3>

            <p className="text-sm text-gray-500">
              Frontend Developer
            </p>
          </div>
        </div>

        {/* Create Post */}
        <Link
          to="/create-post"
          className="mb-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <span className="text-xl">+</span>
          Create Post
        </Link>

        {/* Navigation */}
        <nav className="space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-2xl bg-blue-50 px-4 py-3 font-semibold text-blue-600"
          >
            🏠
            Home
          </Link>

          <Link
            to="/friends"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            👥
            Friends
          </Link>

          <Link
            to="/messages"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            💬
            Messages
          </Link>

          <Link
            to="/notifications"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            ❤️
            Notifications
          </Link>

          <Link
            to="/settings"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            ⚙️
            Settings
          </Link>
        </nav>

        {/* Trending */}
        <div className="mt-6 border-t pt-4">
          <h4 className="mb-3 font-semibold text-gray-800">
            Trending
          </h4>

          <div className="space-y-3 text-sm">
            <div className="cursor-pointer rounded-xl bg-gray-50 p-3 transition hover:bg-gray-100">
              #ReactJS
            </div>

            <div className="cursor-pointer rounded-xl bg-gray-50 p-3 transition hover:bg-gray-100">
              #TailwindCSS
            </div>

            <div className="cursor-pointer rounded-xl bg-gray-50 p-3 transition hover:bg-gray-100">
              #WebDevelopment
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Create Post */}
      <Link
        to="/create-post"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-3xl text-white shadow-lg transition hover:bg-blue-700 lg:hidden"
      >
        +
      </Link>
    </aside>
  );
};

export default Sidebar;