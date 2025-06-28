import apiService from "./axios/AxiosInstance";
import useSWR from 'swr';
import { showToast } from '../consts/toast';
import { getAuthTokenByName, refreshTokenName, removeAuthTokens, updateTokens } from '../utils/functions/localstorage';
export const userDataKey = 'user-data';
const fetchUserDataById = async (id) => {
    const res = await apiService.apiClient.get(`/user/details/${id}`);
    return res.data;
};
export const useGetUserDataById = (userid) => useSWR(userid ? userid : null, fetchUserDataById);
const fetchUserData = async () => {
    const res = await apiService.apiClient.get('/user/data');
    return res.data;
};
export const useGetUserData = (userid) => useSWR(userid ? `user-data` : null, fetchUserData);
export const loginUser = async (email, password) => {
    const data = (await apiService.apiClient.post('/auth/login', {
        email,
        password
    })).data;
    updateTokens(data);
};
export const registerUser = async (email, username, password) => {
    (await apiService.apiClient.post('/auth/register', {
        email,
        username,
        password
    }));
    await loginUser(email, password);
};
export const logout = async () => {
    try {
        const refreshToken = getAuthTokenByName(refreshTokenName);
        (await apiService.apiClient.post('/auth/logout', {}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        }));
        removeAuthTokens();
    }
    catch {
        showToast('failed to logout', "error");
    }
};
export const getLogin = async (username, password) => {
    try {
        await loginUser(username, password);
        showToast('login successfully', "success");
        return true;
    }
    catch (error) {
        showToast('failed to login', "error");
        return;
    }
};
export const editProfile = async (userId, editedProfile) => {
    try {
        (await apiService.apiClient.put(`user/update`, editedProfile)).data;
        showToast('successfully update profile', "success");
    }
    catch (error) {
        showToast('failed to edit post', "error");
    }
};
export const saveUserContext = async (userContext) => {
    try {
        (await apiService.apiClient.post(`user/context/create`, userContext));
    }
    catch (error) {
        showToast('failed to save user context', "error");
    }
};
export const checkUserContext = async () => {
    try {
        return (await apiService.apiClient.get(`user/context/check`)).data;
    }
    catch (error) {
        showToast('failed to check user context', "error");
    }
};
export const googleSignin = async (credential) => {
    const tokens = (await apiService.apiClient.post('/auth/login/google', {
        credential,
    })).data;
    updateTokens(tokens);
    console.log('after server valid', tokens);
};
//# sourceMappingURL=userService.js.map