


import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: import.meta.env.PROD ? "https://local-chef-bazaar-server-nu.vercel.app" : "/api/",
});

const useAxiosSecure = () => {

    const {user, logOut} = useAuth();
    const navigate = useNavigate()

    useEffect(() =>{
        const reqInterceptor = axiosSecure.interceptors.request.use(async (config) => {
            const token = await user?.getIdToken();
            if (token) {
                config.headers.set('Authorization', `Bearer ${token}`);
            }

            return config
        })

        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response
        }, async (error) => {
            console.log(error)
            const status = error.response?.status;
            if(status === 401 || status === 403){
                await logOut();
                navigate('/login');
            }
            return Promise.reject(error)
        }
        )

        return() => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor)
        }
    },[user, logOut, navigate])
    return axiosSecure
};

export default useAxiosSecure;
