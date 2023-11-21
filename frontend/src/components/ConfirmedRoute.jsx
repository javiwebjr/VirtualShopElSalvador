import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ConfirmedRoute = () => {
    const {userInfo} = useSelector(state => state.auth);
    return userInfo && userInfo.isConfirmed ? <Navigate to="/" replace /> : <Outlet />;
}

export default ConfirmedRoute