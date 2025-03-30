import { ILoginResponse } from "../../services/userService";

export const accessTokenName = 'accessToken';
export const refreshTokenName = 'refreshToken';

export const updateTokens = (authTokens: ILoginResponse) => {
  localStorage.setItem(accessTokenName, authTokens.accessToken);
  localStorage.setItem(refreshTokenName, authTokens.refreshToken);
}

export const removeAuthTokens = () => {
    localStorage.removeItem(accessTokenName);
    localStorage.removeItem(refreshTokenName);
}

export const getAuthTokenByName = (tokenName: string) => {
  return localStorage.getItem(tokenName);
}