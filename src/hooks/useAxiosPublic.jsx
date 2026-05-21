import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: import.meta.env.PROD ? "https://local-chef-bazaar-server-nu.vercel.app" : "/api/",
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
