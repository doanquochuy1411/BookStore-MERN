import { ReactNode } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>
    }

    if (currentUser) {
        return children;
    }

    return <Navigate to="/login" replace />
}

export default PrivateRoute