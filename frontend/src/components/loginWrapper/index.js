'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/userContext';
import { useGetUserData } from '../../services/userService';
export const LoginWrapper = () => {
    const authtoken = localStorage.getItem('accessToken');
    const { setUserData, user } = useUser();
    const { data, isLoading } = useGetUserData(authtoken ? authtoken : null);
    const navigate = useNavigate();
    useEffect(() => {
        if (data) {
            setUserData(data);
        }
    }, [data, setUserData]);
    if (isLoading)
        return _jsx(CircularProgress, {});
    // If no auth token or user, redirect to login
    if (!authtoken && !user) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    return _jsx(Outlet, {});
};
//# sourceMappingURL=index.js.map