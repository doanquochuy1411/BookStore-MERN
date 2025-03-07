import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'

const LayoutAuth = () => {
    return (
        <div className='w-full h-screen'>
            <Outlet />
            <ToastContainer />
        </div>
    )
}

export default LayoutAuth