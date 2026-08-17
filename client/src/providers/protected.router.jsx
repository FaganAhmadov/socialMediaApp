import React, { useEffect, useState } from 'react'
import Loader from '../components/ui/loader'
import { currentUser } from '../services/auth.service'
import { Navigate } from 'react-router-dom'

function ProtectedRouter({ children }) {
    const [isLogin, setIsLogin] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                await currentUser()
                setIsLogin(true)
            } catch (error) {
                setIsLogin(false)
            }
        }
        fetchData()
    }, [])
    if (isLogin === null) {
        return <Loader />
    }
    return isLogin ? children : <Navigate to={'/login'} />
}

export default ProtectedRouter