
import { createContext, useContext, useState } from "react";
import { toast } from 'react-toastify';
import { customAxiosInstance } from "./axiosClient";
import { useNavigate } from "react-router";


const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const navigate = useNavigate();
    const fetchUserData = async (username) => {


        if (!username) return

        try {
            const { data } = await customAxiosInstance.get(`users/${username}`)
            if (data) {
                console.log(data);
                return (data.user)
            }
        } catch (err) {
            navigate('/not-found', { state: { message: `Could not find any user named ${username}` } });
            console.error(err);
        }
    }

    const notifyError = (errorText) => {
        toast.error(errorText)
    }

    const notifySuccess = (text) => {
        toast.success(text)
    }






    const value = {
        fetchUserData,
        notifySuccess,
        notifyError
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )

}

const useGlobal = function () {

    return useContext(GlobalContext);
}

export { GlobalProvider, useGlobal }