
import { createContext, useContext, useState } from "react";
import { toast } from 'react-toastify';
import { customAxiosInstance } from "./axiosClient";


const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const fetchUserData = async (username) => {


        if (!username) return

        try {
            const { data } = await customAxiosInstance.get(`users/${username}`)
            if (data) {
                console.log(data.user);
                return (data.user)
            }
        } catch (err) {
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