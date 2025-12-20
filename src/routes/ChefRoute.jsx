import React from 'react';
//import useAuth from '../Hooks/useAuth';
//import useRole from '../Hooks/useRole';
import Loading from '../Components/Shared/Loading';
import Forbidden from '../Components/Shared/Forbidden';
import useRole from '../hooks/useRole';
import useAuth from '../hooks/useAuth';

const ChefRoute = ({children}) => {
    const {loading} = useAuth();
    const {role, roleLoading} = useRole();
    if(loading || roleLoading){
        return <Loading/>
    }
    if(role !== "chef"){
        return <Forbidden/>
    }
    return children
};

export default ChefRoute;