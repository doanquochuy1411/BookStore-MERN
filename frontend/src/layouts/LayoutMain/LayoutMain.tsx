import { Outlet } from "react-router"
import Footer from "../../components/Footer"
import Navbar from "../../components/Nabar"
import { ToastContainer } from "react-toastify"

const LayoutMain: React.FC = (): JSX.Element => {
    return (
        <div>
            <Navbar />
            <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
                <Outlet />
            </main>
            <Footer />
            <ToastContainer />
        </div>
    )
}

export default LayoutMain