import './Navbar.css';
import logo from '../../assets/images/boolbook-favicon-color.png'
import { IoHome, IoHomeOutline, IoSearchOutline, IoHeart, IoHeartOutline, IoLogOut, IoSettings } from "react-icons/io5";

import { RiUserLine, RiUserFill } from 'react-icons/ri';
import { Avatar } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Dropdown from '../Dropdown';




export default () => {
    const { user, logout } = useAuth();
    const userDropdownOptions = [
        {
            label: 'Logout',
            icon: <IoLogOut

            />,
            cb: () => { logout() }
        },
        {
            label: 'Settins',
            icon: <IoSettings

            />,
            cb: () => { }
        },
    ]
    return (
        <menu className='flex flex-col justify-between items-start h-screen py-8 ps-6 fixed'>
            <Link
                to={'/'}>
                <img src={logo} alt="logo" className='w-[50px]' />
            </Link>
            <div className="icons-container text-gray-400 flex flex-col gap-6 text-4xl items-center">
                <NavLink to="/" end>
                    {({ isActive }) => isActive ? <IoHome className='navbar-icon active' /> : <IoHomeOutline className='navbar-icon' />}
                </NavLink>
                {/* <NavLink>
                    <IoSearchOutline
                        className='navbar-icon'
                    />
                </NavLink>
                <NavLink>
                    <IoHeartOutline
                        className='navbar-icon'
                    />
                </NavLink> */}
                <NavLink
                    to={`/${user?.username}`}
                >
                    {({ isActive }) => isActive ? <RiUserFill className='navbar-icon active' /> : <RiUserLine className='navbar-icon' />}
                </NavLink>




            </div>
            <div className="navbar-bottom text-white flex flex-col gap-2">
                <Dropdown
                    button={<Avatar
                        sx={{ bgcolor: '#DAA520', color: 'gray', width: 36, height: 36 }}
                        alt={user?.username}
                        src={user?.avatar || ''}
                    />}
                    options={userDropdownOptions}
                />

            </div>
        </menu>


    )


};