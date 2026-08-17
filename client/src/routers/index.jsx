import { createBrowserRouter } from 'react-router-dom';

import Login from '../pages/user/login';
import Register from '../pages/user/register';
import Layout from '../layout/user';
import PostCreate from '../pages/user/postCreate';
import AdminLayout from '../layout/admin';
import ProtectedRouter from '../providers/protected.router';
import ForgotPassword from '../pages/user/forgot.password';
import ResetPassword from '../pages/user/reset.password';
import Feed from '../pages/user/feed';

export const routers = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: '/reset-password',
        element: <ResetPassword />,
    },
    {
        path: '/',
        element: (
            <ProtectedRouter>
                <Layout />
            </ProtectedRouter>
        ),
        children: [
            {
                index: true,
                element: <Feed />,
            },
            {
                path: 'create-post',
                element: <PostCreate />,
            },
        ],
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [],
    },
]);