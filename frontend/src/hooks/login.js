"use strict";
// import React, { useState } from "react";
// import { useUser } from "../contexts/userContext";
// import { AxiosInstence } from "../services/axios/AxiosInstance";
// export interface ILoginResponse {
//   token: string;
//   refreshToken: string;  
// }
// export const useLogin = () => {
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const { user, setUserData, logout } = useUser();
//   const login = async (username: string, password: string) => {
//     // setIsLoading(true);
//     try {
//       const { data: { token } } = await AxiosInstence.post<ILoginResponse>('/api/login', { username, password });
//       setToken(token);
//       const { data: userData } = await AxiosInstence.get('/api/user');
//       setUserData(userData);
//     } catch (error) {
//       console.error('Login failed:', error);
//       logout();
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const setToken = (token: string) => {
//     localStorage.setItem('accessToken', token);
//     // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   };
//   // Logout function
//   return <></>
// }
//# sourceMappingURL=login.js.map