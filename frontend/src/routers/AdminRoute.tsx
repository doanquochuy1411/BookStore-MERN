import React, { ReactNode } from 'react'
import { ACCESS_TOKEN, getLocalStorage } from '../helpers/helper'
import { Navigate, Outlet } from 'react-router'

const AdminRoute = ({ children }: { children: ReactNode }) => {
    const token = getLocalStorage(ACCESS_TOKEN)

    if (!token) {
        return <Navigate to="/admin" />
    }

    return children ? children : <Outlet />;
}

export default AdminRoute