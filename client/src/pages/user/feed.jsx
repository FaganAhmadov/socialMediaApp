import React, { useEffect, useState } from 'react';
import { getAllActivePostsForFeed } from '../../services/post.service';
import { toast } from 'react-toastify';
import LikeIkon from '../../components/icons/likeIkon';

const Feed = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const data = await getAllActivePostsForFeed();
                setPosts(data.data);
            } catch (error) {
                toast.error(error);
            }
        })();
    }, [])

    return (
        <div className="mx-auto w-full max-w-2xl space-y-6">
            <div className="rounded-3xl border bg-white p-4 shadow-sm sm:p-5">
                <div className="flex items-center gap-3">
                    <img
                        src="https://i.pravatar.cc/60?img=5"
                        alt="user"
                        className="h-12 w-12 rounded-full object-cover"
                    />

                    <input
                        type="text"
                        placeholder="What’s on your mind?"
                        className="min-w-0 flex-1 rounded-full bg-gray-100 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 border-t pt-4 text-sm font-medium text-gray-600">
                    <button className="rounded-xl py-2 hover:bg-gray-100">📷 Photo</button>
                    <button className="rounded-xl py-2 hover:bg-gray-100">🎥 Video</button>
                    <button className="rounded-xl py-2 hover:bg-gray-100">😊 Feeling</button>
                </div>
            </div>
            {posts.map((post) => (
                <div
                    key={post._id}
                    className="overflow-hidden rounded-3xl border bg-white shadow-sm"
                >
                    {/* User */}
                    <div className="flex items-center gap-3 p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                            {post.userID.username?.[0]?.toUpperCase()}
                        </div>

                        <span className="truncate text-sm font-semibold">
                            {post.userID.username}
                        </span>
                    </div>

                    {/* Image */}
                    <img
                        src={`${post.postImage}`}
                        alt={post.description}
                        className="h-56 w-full object-cover sm:h-80"
                    />

                    {/* Content */}
                    <div className="p-5">
                        <div className="mb-4 flex items-center gap-5">
                            <button className="flex items-center gap-2 text-gray-600 transition hover:text-red-500">
                                <LikeIkon />
                                <span className="text-sm font-medium">
                                    {post.likes}
                                </span>
                            </button>

                            <button className="text-sm text-gray-500 hover:text-black">
                                Comment
                            </button>

                            <button className="ml-auto text-sm text-gray-500 hover:text-black">
                                Share
                            </button>
                        </div>

                        <p className="text-sm leading-6 text-gray-700">
                            {post.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Feed;