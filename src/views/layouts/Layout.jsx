
import { ToastContainer } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router";



export default () => {



    return (

        <div className="flex">
            <ToastContainer
                theme="dark"
                hideProgressBar
            />
            <Navbar className='fixed' />
            <div className="content-container w-full">
                <Outlet />
            </div>
        </div>
    );
};