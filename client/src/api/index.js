import axios from 'axios'
const baseURL = import.meta.env.VITE_API_URL
export const api = axios.create({
    baseURL,
    withCredentials: true
})

api.interceptors.response.use(
    (r) => r,
    (err) => {
        const msg = err.response?.data?.message || err.message || 'Something went wrong';
        return Promise.reject(msg)
    }
)
