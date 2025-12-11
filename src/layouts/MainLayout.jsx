import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Shared/Navbar/Navbar';
import Footer from '../components/Shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='pt-4 min-h-[calc(100vh-68px)] '>
                <Outlet></Outlet>

            </div>
            <div className='mt-1'>
                <Footer></Footer>
            </div>
            

        </div>
    );
};

export default MainLayout;