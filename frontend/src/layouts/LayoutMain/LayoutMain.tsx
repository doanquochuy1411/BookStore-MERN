import { Outlet } from "react-router"
import Navbar from "../../components/Nabar/Navbar"
import Footer from "../../components/Nabar/Footer"

const LayoutMain: React.FC = (): JSX.Element => {
    return (
        <div>
            <Navbar />
            <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default LayoutMain