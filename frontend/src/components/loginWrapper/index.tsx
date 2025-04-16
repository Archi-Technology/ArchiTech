'use client';

import { CircularProgress } from '@mui/material';
import type React from 'react';
import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/userContext';
import { useGetUserData } from '../../services/userService';

export const LoginWrapper: React.FC = () => {
  const authtoken = localStorage.getItem('accessToken');
  const { setUserData, user } = useUser();
  const { data, isLoading } = useGetUserData(authtoken ? authtoken : null);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data, setUserData]);

  if (isLoading) return <CircularProgress />;

  // If no auth token or user, redirect to login
  if (!authtoken && !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
