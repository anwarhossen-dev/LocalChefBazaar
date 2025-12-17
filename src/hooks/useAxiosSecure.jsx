// import { useEffect } from 'react'
// import { useNavigate } from 'react-router'
// import axios from 'axios'
// import useAuth from './useAuth'

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
// })

// const useAxiosSecure = () => {
//   const { user, logOut, loading } = useAuth()
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (!loading && user?.accessToken) {
//       // Add request interceptor
//       const requestInterceptor = axiosInstance.interceptors.request.use(
//         config => {
//           config.headers.Authorization = `Bearer ${user.accessToken}`
//           return config
//         }
//       )

//       // Add response interceptor
//       const responseInterceptor = axiosInstance.interceptors.response.use(
//         res => res,
//         err => {
//           if (err?.response?.status === 401 || err?.response?.status === 403) {
//             logOut()
//               .then(() => {
//                 console.log('Logged out successfully.')
//               })
//               .catch(console.error)
//             navigate('/login')
//           }
//           return Promise.reject(err)
//         }
//       )

//       // Cleanup to prevent multiple interceptors on re-renders
//       return () => {
//         axiosInstance.interceptors.request.eject(requestInterceptor)
//         axiosInstance.interceptors.response.eject(responseInterceptor)
//       }
//     }
//   }, [user, loading, logOut, navigate])

//   return axiosInstance
// }
// export default useAxiosSecure


import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';



const axiosSecure = axios.create({
    baseURL: "http://localhost:3000/",
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