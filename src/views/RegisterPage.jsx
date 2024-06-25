import logo from '../assets/images/logo-no-background.png';

export default function () {
    return (
        <form class="register flex flex-col text-gray-400 w-1/3 gap-4">

            <img src={logo} alt="logo" class="mb-3" />
            <div class="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3">
                <i class="fa-solid fa-user text-lg"></i>
                <input type="text"
                    class="bg-transparent w-full  border-transparent focus:border-transparent focus:ring-0"
                    placeholder="Your Username" v-model="formData.username" autocomplete />
            </div>
            <div v-if="formErrors.username.length > 0" class="error-message text-red-500">
                { }
            </div>
            <div class="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3">
                <i class="fa-solid fa-envelope text-lg"></i>
                <input type="email"
                    class="bg-transparent w-full  border-transparent focus:border-transparent focus:ring-0"
                    placeholder="Your Email" v-model="formData.email" />
            </div>
            <div class="error-message text-red-500">
                { }
            </div>
            <div class="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3 ">
                <i class="fa-solid fa-lock text-lg"></i>
                <input type="password"
                    class="bg-transparent w-full  border-transparent focus:border-transparent focus:ring-0"
                    placeholder="Your Password" v-model="formData.password" />
            </div>
            <div v-if="formErrors.password.length > 0" class="error-message text-red-500">
                { }
            </div>
            <div class="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3">
                <i class="fa-solid fa-lock text-lg"></i>
                <input type="password"
                    class="bg-transparent w-full border-transparent focus:border-transparent focus:ring-0"
                    placeholder="Confirm Password" v-model="formData.confirmPassword" />
            </div>
            <div v-if="formErrors.confirmPassword.length > 0" class="error-message text-red-500">
                { }
            </div>
            <div class="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3">
                <i class="fa-solid fa-image text-lg"></i>
                <label for="profile_pic" class="cursor-pointer py-2">{ }</label>
                <input type="file" id="profile_pic" class="bg-transparent w-full hidden"
                    placeholder="Confirm Password" accept=".png, .jpg, .jpeg" />
            </div>
            <div class="error-message text-red-500">
                { }
            </div>
            <button
                class="bg-theme hover:bg-theme-dark text-input text-lg font-bold py-2 px-4 rounded-xl transition duration-300 mt-3">
                Register
            </button>
            <p class="font-bold text-xl mt-3 cursor-pointer" >
                Already have an account?
            </p>
        </form>
    )
}