import apiService from "./axios/AxiosInstance";
import useSWR from 'swr'; 
import { showToast } from '../consts/toast';
import { IGenericResponse, IUser } from '../interfaces/user';
import { getAuthTokenByName, refreshTokenName, removeAuthTokens, updateTokens } from '../utils/functions/localstorage';
import { IUserContext } from '../components/cloud-assistant';

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRegisterResponse {
  _id: string;
  username: string;
  password: string;
}

export const userDataKey = 'user-data'

const fetchUserDataById = async (id: string) => {
    const res = await apiService.apiClient.get<IUser>(`/user/details/${id}`);
  return res.data;
}

export const useGetUserDataById = (userid: string | null) =>
  useSWR<IUser>(
    userid ? userid : null,  
    fetchUserDataById
  );

const fetchUserData = async () => {
    const res = await apiService.apiClient.get<IUser>('/user/data');
  return res.data;
}

export const useGetUserData = (userid: string | null) =>
  useSWR<IUser>(
    userid ? `user-data` : null,
    fetchUserData
  );


export const loginUser = async (email: string, password: string) => {

  const data = (await apiService.apiClient.post<ILoginResponse>('/auth/login', {
    email,
    password
  })).data;

  updateTokens(data);
};

export const registerUser = async (email: string, username: string, password: string) => {

  (await apiService.apiClient.post<IRegisterResponse>('/auth/register', {
    email,
    username,
    password
  }));

  await loginUser(email, password);
};

export const logout = async () => {
  try {
    const refreshToken = getAuthTokenByName(refreshTokenName);
    (await apiService.apiClient.post<IRegisterResponse>('/auth/logout', {}, {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    }));
    removeAuthTokens()
  } catch {
    showToast('failed to logout', "error");

  }
};

export const getLogin = async (username: string, password: string) => {
  try {
    await loginUser(username, password);
    showToast('login successfully', "success");

    return true;
  } catch (error) {
    showToast('failed to login', "error");
    return
  }
}


export const editProfile = async (userId: string, editedProfile: FormData) => {
  try {
        (await apiService.apiClient.put<IGenericResponse>(`user/update`, editedProfile)).data
    showToast('successfully update profile', "success")
  } catch (error) {
    showToast('failed to edit post', "error")
  }
}

export const saveUserContext = async ( userContext: Partial<IUserContext>) => {
  try {
        (await apiService.apiClient.post<IGenericResponse>(`user/context/create`, userContext))
  } catch (error) {
    showToast('failed to save user context', "error")
  }
}

export const checkUserContext = async ( ) => {
  try {
        return (await apiService.apiClient.get<IGenericResponse>(`user/context/check`)).data
  } catch (error) {
    showToast('failed to check user context', "error")
  }
}


export const googleSignin = async (credential?: string) => {

  const tokens = (await apiService.apiClient.post<ILoginResponse>('/auth/login/google', {
    credential,
  })).data;

  updateTokens(tokens)
  console.log('after server valid', tokens);
};
