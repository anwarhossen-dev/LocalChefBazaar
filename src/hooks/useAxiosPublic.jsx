// // import axios from 'axios';

// // const axiosPublic = axios.create({
// //     baseURL: "/api/",
// // });

// // const useAxiosPublic = () => {
// //     return axiosPublic;
// // };

// // export default useAxiosPublic;


// import axios from "axios";

// const axiosPublic = axios.create({
//   //baseURL: "http://localhost:3000",
//   baseURL: import.meta.env.VITE_API_URL,
// });

// export default function useAxiosPublic() {
//   return axiosPublic;
// }

import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "/api",
});

export default function useAxiosPublic() {
    return axiosPublic;
}