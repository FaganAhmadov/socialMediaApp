import { api } from '../api';

export const login = async (body) => {
    const res = await api.post('/auth/login', body);
    if (!res.data) {
        throw new Error('Login failed');
    }
    return res.data;
};

export const register = async (body) => {
    const res = await api.post('/auth/register', body);
    if (!res.data) {
        throw new Error('Register failed');
    }
    return res.data;
};

export const currentUser = async () => {
    const res = await api.get('/auth/currentUser');
    if (!res.data) {
        throw new Error('Current user failed');
    }
    return res.data;
};

export const logout = async () => {
    const res = await api.post('/auth/logout');
    if (!res.data) {
        throw new Error('Logout failed');
    }
    return res.data;
};

export const forgotPassword = async (body) => {
    const res = await api.post('/auth/forgot-password', body);
    if (!res.data) {
        throw new Error('Logout failed');
    }
    return res.data;
};

export const resetPassword = async (body, token) => {
    const res = await api.post(`/auth/reset-password?token=${token}`, body);
    if (!res.data) {
        throw new Error('Logout failed');
    }
    return res.data;
};
export const checkToken = async (token) => {
    const res = await api.get(`/auth/checkToken?token=${token}`);
    if (!res.data) {
        throw new Error('Logout failed');
    }
    return res.data;
};

