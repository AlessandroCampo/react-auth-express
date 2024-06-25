import { useRef, useState } from 'react';
import logo from '../assets/images/logo-no-background.png';
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineLockClosed as PassIcon, HiOutlineUser as UserIcon } from "react-icons/hi";
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router';


export default function () {

    const { setUser, setToken } = useAuth();
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const [loginErrors, setLoginErrors] = useState({
        username: [],
        password: []
    })

    const formRef = useRef(null);


    const validateLoginData = (payload) => {


    }


    const handleErrors = (errorList) => {
        const newErrors = {};
        errorList.forEach(error => {
            const { path, msg } = error;
            if (!newErrors[path]) {
                newErrors[path] = [];
            }
            newErrors[path].push(msg);
        });

        setLoginErrors(newErrors);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const username = formData.get('username');
        const password = formData.get('password');

        console.log('Username:', username);
        console.log('Password:', password);
        await login({ username, password })

        formRef.current.reset();
    };
    const login = async (payload) => {

        try {
            const { data } = await axios.post(`${apiUrl}users/login`, payload);
            if (data) {
                localStorage.setItem('authTokenReact', data.token)
                localStorage.setItem('reactUsername', data.user.username)
                setUser(data.user);
                setToken(data.token);
                console.log(data.user);
                navigate('/');


            }
        } catch (err) {
            const errorList = err?.response?.data?.errors
            if (errorList) {
                handleErrors(errorList)
            }
            console.error(err);
        }
    }


    return (
        <div className="form-container flex items-center justify-center h-full">

            <form
                className="register flex flex-col text-gray-400 w-2/5 gap-4"
                ref={formRef}
                onSubmit={handleSubmit}
            >
                <div className="uppercase text-2xl font-semibold text-center mb-3">
                    <img src={logo} alt="logo" />
                </div>

                <div className="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3">
                    <UserIcon
                        className='text-xl'
                    />
                    <input type="text"
                        className="bg-transparent w-full  border-transparent focus:border-transparent focus:ring-0"
                        placeholder="Your Username"
                        name='username'

                    />
                </div>
                {
                    loginErrors.username.length !== 0 && <div className="error-message text-red-500">
                        {loginErrors.username[0]}
                    </div>
                }

                <div className="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3">
                    <PassIcon
                        className='text-xl'
                    />
                    <input type="password"
                        className="bg-transparent w-full border-transparent focus:border-transparent focus:ring-0"
                        name='password'
                        placeholder="Your Password" />
                </div>
                {
                    loginErrors.password.length !== 0 && <div className="error-message text-red-500">
                        {loginErrors.password[0]}
                    </div>
                }
                <button
                    className="bg-theme hover:bg-theme-dark text-input text-lg font-bold py-2 px-4 rounded-xl transition duration-300 mt-3"
                >
                    Log In
                </button >
                <button
                    className="bg-input hover:bg-gray-900 text-gray-400 border-0 border-gray-400 text-lg font-bold py-2 px-4 rounded-xl transition duration-300"
                >
                    Forgot your password ?
                </button >
                <p className="font-bold text-xl mt-3 cursor-pointer" >
                    Don't have an account yet?
                </p >
            </form >
        </div>
    )
}