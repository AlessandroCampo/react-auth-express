import { useRef, useState } from 'react';
import logo from '../assets/images/logo-no-background.png';
import { HiOutlineLockClosed as PassIcon, HiOutlineUser as UserIcon } from "react-icons/hi";
import { HiOutlineEnvelope as MailIcon } from "react-icons/hi2";
import { IoImageOutline as ImageIcon } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { customAxiosInstance } from '../axiosClient';
import { useAuth } from '../contexts/AuthContext';

export default function () {

    const { setUser, setToken } = useAuth();
    const navigate = useNavigate();

    const [registerErrors, setregisterErrors] = useState({
        username: [],
        email: [],
        password: [],
        image: []
    })

    const [pictureLabel, setPictureLabel] = useState('Upload your profile picture')

    const formRef = useRef(null);

    const isValidEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };


    const validateRegistrationForm = (payload) => {
        const errors = {};


        if (!payload.username) {
            errors.username = ['Username is required'];
        }

        if (!payload.email) {
            errors.email = ['Email is required'];
        } else if (!isValidEmail(payload.email)) {
            errors.email = ['Invalid email format'];
        }

        if (!payload.password) {
            errors.password = ['Password is required'];
        }

        if (payload.password !== payload.confirmPassword) {
            errors.password = ["Your password and confirm password don't match"];
        }

        setregisterErrors({
            username: [],
            email: [],
            password: [],
            image: [],
            ...errors
        });


        return Object.keys(errors).length === 0;
    };



    const handleErrors = (errorList) => {



        const newErrors = {
            username: [],
            email: [],
            password: [],
            image: []
        };


        errorList.forEach(error => {
            const { path, msg } = error;
            if (newErrors[path]) {
                newErrors[path].push(msg);
            }
        });

        setregisterErrors(prevErrors => ({
            ...prevErrors,
            ...newErrors
        }));
    };



    const register = async (payload) => {
        if (!validateRegistrationForm(payload)) return

        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        try {
            const { data } = await customAxiosInstance.post(`users/register`, payload, { headers });
            if (data) {
                localStorage.setItem('authTokenReact', data.token)
                localStorage.setItem('reactUsername', data.user.username)
                formRef.current.reset();
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


    const handleSubmit = async (e) => {
        //add frontend validation
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const username = formData.get('username');
        const password = formData.get('password');
        const email = formData.get('email');
        const image = formData.get('image')
        console.log(formData)

        await register({ username, password, email, image })


    };

    return (
        <div className="form-container flex items-center justify-center h-full">
            <form
                className="register flex flex-col text-gray-400 w-1/3 gap-4"
                onSubmit={handleSubmit}
                ref={formRef}
            >

                <img src={logo} alt="logo" className="mb-3" />
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
                    registerErrors.username.length !== 0 && <div className="error-message text-red-500">
                        {registerErrors.username[0]}
                    </div>
                }

                <div className="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3">
                    <MailIcon
                        className='text-xl' />
                    <input type="email"
                        className="bg-transparent w-full  border-transparent focus:border-transparent focus:ring-0"
                        placeholder="Your Email"
                        name='email' />
                </div>
                {
                    registerErrors.email.length !== 0 && <div className="error-message text-red-500">
                        {registerErrors.email[0]}
                    </div>
                }
                <div className="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3 ">
                    <PassIcon
                        className='text-xl' />
                    <input
                        type="password"
                        className="bg-transparent w-full  border-transparent focus:border-transparent focus:ring-0"
                        placeholder="Your Password"
                        name='password' />
                </div>

                <div className="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3">
                    <PassIcon
                        className='text-xl' />
                    <input type="password"
                        className="bg-transparent w-full border-transparent focus:border-transparent focus:ring-0"
                        placeholder="Confirm Password"
                        name='passwordConfirm' />
                </div>
                {
                    registerErrors.password.length !== 0 && <div className="error-message text-red-500">
                        {registerErrors.password[0]}
                    </div>
                }
                <div className="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3">
                    <ImageIcon className='text-xl' />
                    <label htmlFor="profile_pic" className="cursor-pointer">{pictureLabel}</label>
                    <input
                        type="file" id="profile_pic"
                        className="bg-transparent w-full hidden"
                        name='image'
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => { setPictureLabel(e.target.files[0].name) }}

                    />
                </div>
                {
                    registerErrors.image.length !== 0 && <div className="error-message text-red-500">
                        {registerErrors.image[0]}
                    </div>
                }
                <button
                    className="bg-theme hover:bg-theme-dark text-input text-lg font-bold py-2 px-4 rounded-xl transition duration-300 mt-3">
                    Register
                </button>
                <Link
                    to="/login"
                >

                    <p className="font-bold text-lg mt-3 cursor-pointer" >
                        Got an account already?
                    </p >
                </Link>
            </form>
        </div>


    )
}