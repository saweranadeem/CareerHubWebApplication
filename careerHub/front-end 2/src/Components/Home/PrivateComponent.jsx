import React from "react";
import {Navigate, Outlet} from 'react-router-dom'   // outlet handles the component that we pass and have props

const PrivateComponent = () => {

    // auth will get and check data in local storage
    const auth = localStorage.getItem('user');
    // if data is in local storage then we wil see outlet (means all the nav items), if no data then we will go to sign up page.After sign up we will see private components
    return auth? <Outlet></Outlet>:<Navigate to ='/login'></Navigate>  
}

export default PrivateComponent;