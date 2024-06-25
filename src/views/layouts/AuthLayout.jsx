

import { Outlet } from "react-router";
import './layoutStyles.css';


export default () => {

    return (
        <div className="flex w-screen">
            <div className="bg-container">

            </div>
            <div className="w-[45%]">
                <Outlet />
            </div>
        </div>
    );
};