// import React from 'react';
// import { Outlet } from 'react-router';
// //import Navbar from '../Components/Shared/Navbar/Navbar';
// import Footer from '../components/Shared/Footer/Footer';
// import Navbar from '../Components/Shared/Navbar/Navbar';

// const MainLayout = () => {
//     return (
//         <div>
//             <Navbar></Navbar>
//             <div className='pt-4 min-h-[calc(100vh-68px)] '>
//                 <Outlet></Outlet>

//             </div>
//             <div className='mt-1'>
//                 <Footer></Footer>
//             </div>
            

//         </div>
//     );
// };

// export default MainLayout;

import React from "react";
import { Outlet } from "react-router";
//import NavBar from "../../Components/Shared/Navbar";
//import Footer from "../../Components/Shared/Footer";
//import useAuth from "../../Hooks/useAuth";
//import AppLoading from "../../Components/Shared/AppLoading";
//import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import AppLoading from "../Components/Shared/AppLoading";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";
import useAuth from "../Hooks/useAuth";
import ScrollToTop from "../Components/ScrollToTop/ScrollToTop";

const MainLayout = () => {
    const { loading } = useAuth();
    if (loading) {
        return <AppLoading />;
    }
    return (
        <div className=" flex flex-col min-h-screen text-base-content">
            {/* Navbar */}
            <ScrollToTop></ScrollToTop>
            <Navbar/>

            {/* Main Content - grows to fill available space */}
            <main className=" grow">
                <div className="max-w-7xl mx-auto px-2 sm:px-4">
                    <Outlet />
                </div>
            </main>

            {/* Footer stays at the bottom */}
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;