export const accessTokenName = 'accessToken';
export const refreshTokenName = 'refreshToken';
export const updateTokens = (authTokens) => {
    localStorage.setItem(accessTokenName, authTokens.accessToken);
    localStorage.setItem(refreshTokenName, authTokens.refreshToken);
};
export const removeAuthTokens = () => {
    localStorage.removeItem(accessTokenName);
    localStorage.removeItem(refreshTokenName);
};
export const getAuthTokenByName = (tokenName) => {
    return localStorage.getItem(tokenName);
};
//# sourceMappingURL=localstorage.js.map