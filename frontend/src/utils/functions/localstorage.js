"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthTokenByName = exports.removeAuthTokens = exports.updateTokens = exports.refreshTokenName = exports.accessTokenName = void 0;
exports.accessTokenName = 'accessToken';
exports.refreshTokenName = 'refreshToken';
const updateTokens = (authTokens) => {
    localStorage.setItem(exports.accessTokenName, authTokens.accessToken);
    localStorage.setItem(exports.refreshTokenName, authTokens.refreshToken);
};
exports.updateTokens = updateTokens;
const removeAuthTokens = () => {
    localStorage.removeItem(exports.accessTokenName);
    localStorage.removeItem(exports.refreshTokenName);
};
exports.removeAuthTokens = removeAuthTokens;
const getAuthTokenByName = (tokenName) => {
    return localStorage.getItem(tokenName);
};
exports.getAuthTokenByName = getAuthTokenByName;
//# sourceMappingURL=localstorage.js.map