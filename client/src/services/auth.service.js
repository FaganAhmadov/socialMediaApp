import { api } from '../api';

const USER_STORAGE_KEY = 'socialflow-current-user';

export const setCurrentUser = (user) => {
    if (!user) return;
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

export const getCurrentUser = () => {
    try {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        return null;
    }
};

export const clearCurrentUser = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
};

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
    if (res.data.user) {
        setCurrentUser(res.data.user);
    }
    return res.data;
};

export const currentUser = async () => {
    const res = await api.get('/auth/currentUser');
    if (!res.data) {
        throw new Error('Current user failed');
    }

    const user = res.data.user ?? res.data;
    if (user) {
        setCurrentUser(user);
    }
    return user;
};

export const logout = async () => {
    const res = await api.post('/auth/logout');
    if (!res.data) {
        throw new Error('Logout failed');
    }
    clearCurrentUser();
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

