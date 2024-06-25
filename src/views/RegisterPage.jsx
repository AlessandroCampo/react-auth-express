import logo from '../assets/images/logo-no-background.png';
import { HiOutlineLockClosed as PassIcon, HiOutlineUser as UserIcon } from "react-icons/hi";
import { HiOutlineEnvelope as MailIcon } from "react-icons/hi2";
import { IoImageOutline as ImageIcon } from "react-icons/io5";
import { Link } from 'react-router-dom';

export default function () {
    return (
        <div className="form-container flex items-center justify-center h-full">
            <form class="register flex flex-col text-gray-400 w-1/3 gap-4">

                <img src={logo} alt="logo" class="mb-3" />
                <div class="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3">
                    <UserIcon
                        className='text-xl'
                    />
                    <input type="text"
                        class="bg-transparent w-full  border-transparent focus:border-transparent focus:ring-0"
                        placeholder="Your Username" v-model="formData.username" autocomplete />
                </div>
                <div v-if="formErrors.username.length > 0" class="error-message text-red-500">
                    { }
                </div>
                <div class="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3">
                    <MailIcon
                        className='text-xl' />
                    <input type="email"
                        class="bg-transparent w-full  border-transparent focus:border-transparent focus:ring-0"
                        placeholder="Your Email" v-model="formData.email" />
                </div>
                <div class="error-message text-red-500">
                    { }
                </div>
                <div class="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3 ">
                    <PassIcon
                        className='text-xl' />
                    <input type="password"
                        class="bg-transparent w-full  border-transparent focus:border-transparent focus:ring-0"
                        placeholder="Your Password" v-model="formData.password" />
                </div>
                <div class="error-message text-red-500">
                    { }
                </div>
                <div class="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3">
                    <PassIcon
                        className='text-xl' />
                    <input type="password"
                        class="bg-transparent w-full border-transparent focus:border-transparent focus:ring-0"
                        placeholder="Confirm Password" v-model="formData.confirmPassword" />
                </div>
                <div class="error-message text-red-500">
                    { }
                </div>
                <div class="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3">
                    <ImageIcon className='text-xl' />
                    <label htmlFor="profile_pic" class="cursor-pointer">Upload your profile picture</label>
                    <input type="file" id="profile_pic" class="bg-transparent w-full hidden"
                        accept=".png, .jpg, .jpeg" />
                </div>
                <div class="error-message text-red-500">
                    { }
                </div>
                <button
                    class="bg-theme hover:bg-theme-dark text-input text-lg font-bold py-2 px-4 rounded-xl transition duration-300 mt-3">
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