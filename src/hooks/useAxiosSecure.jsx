


import axios from 'axios';
import React, { useEffect } from 'react';
//import useAuth from './useAuth';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';



const axiosSecure = axios.create({
    baseURL: "https://local-chef-bazaar-server-nu.vercel.app/",
});

const useAxiosSecure = () => {

    const {user, logOut} = useAuth();
    const navigate = useNavigate()

    useEffect(() =>{
        const reqInreceptor = axiosSecure.interceptors.request.use((config) => {
            if(user?.accessToken){
                config.headers.Authorization = `Bearer ${user?.accessToken}`;
            }

            return config
        })

        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response
        },(error) => {
            console.log(error)
            const statusCode = error.response?.status;
            if(statusCode === 401 || statusCode === 403){
                logOut().then(()=> {
                    navigate('/login')
                })
            }
            return Promise.reject(error)
        }
        )

        return() => {
            axiosSecure.interceptors.request.eject(reqInreceptor);
            axiosSecure.interceptors.response.eject(resInterceptor)
        }
        


    },[user, logOut, navigate])
    return axiosSecure
};

export default useAxiosSecure;
