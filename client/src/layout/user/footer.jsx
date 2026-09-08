import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto border-t bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-sm text-gray-500 sm:px-6 md:flex-row">
        <p>© 2026 SocialFlow. All rights reserved.</p>

        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-blue-600">Privacy</a>
          <a href="#" className="hover:text-blue-600">Terms</a>
          <a href="#" className="hover:text-blue-600">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;