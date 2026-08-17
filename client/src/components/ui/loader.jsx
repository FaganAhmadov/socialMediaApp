import React from 'react';

const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient from-blue-100 via-white to-purple-100 z-50">
            <div className="bg-white rounded-3xl shadow-2xl px-10 py-8 flex flex-col items-center gap-5 border border-gray-100">
                <div className="w-16 h-16 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>

                <div className="text-center">
                    <h2 className="text-lg font-bold text-gray-800">SocialMediaPro</h2>
                    <p className="text-sm text-gray-500 mt-1 animate-pulse">
                        Loading your feed...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Loader;