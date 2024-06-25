
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router";



export default () => {



    return (
        <div className="flex">
            <Navbar className='fixed' />
            <div className="content-container w-full">
                <Outlet />
            </div>
        </div>
    );
};