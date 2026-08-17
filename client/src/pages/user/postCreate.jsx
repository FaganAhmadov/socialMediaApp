import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { createPostsService } from '../../services/post.service';
import { useNavigate } from 'react-router-dom';

const PostCreate = () => {
    const fileInputRef = useRef();
    const [blobUrl, setBlobUrl] = useState(null)
    const [newPost, setNewPost] = useState({
        file: '',
        describtion: ''
    })

    const inputFileHandler = async ({ target }) => {
        const file = target.files[0]
        setNewPost({
            ...newPost,
            file
        })
        setBlobUrl(URL.createObjectURL(file))
    }
    const navigate = useNavigate()
    const createPost = async (e) => {
        try {
            e.preventDefault()
            const { message } = await createPostsService(newPost)
            toast.success(message)
            navigate('/')
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <div className="mx-auto max-w-2xl rounded-3xl border bg-white p-6 shadow-sm">
            <h1 className="mb-6 text-2xl font-bold text-gray-800">
                Create Post
            </h1>

            <form
                onSubmit={createPost}
                className="space-y-4">
                {/* Description */}
                <textarea
                    onChange={(e) => setNewPost({
                        ...newPost,
                        describtion: e.target.value
                    })}
                    rows={6}
                    placeholder="Share something with your friends..."
                    className="w-full resize-none rounded-2xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    onChange={inputFileHandler}
                    type="file"
                    accept="image/*"
                    className="hidden"
                />

                {/* Image upload */}
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex min-h-64 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-gray-300 text-gray-500 transition hover:bg-gray-50"
                >
                    {blobUrl ? (
                        <img
                            src={blobUrl}
                            alt="Preview"
                            className="h-full max-h-80 w-full object-cover"
                        />
                    ) : (
                        <span>Upload Image</span>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full rounded-2xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                    Publish Post
                </button>
            </form>
        </div>
    );
};

export default PostCreate;