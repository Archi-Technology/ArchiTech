"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleSignin = exports.checkUserContext = exports.saveUserContext = exports.editProfile = exports.getLogin = exports.logout = exports.registerUser = exports.loginUser = exports.useGetUserData = exports.useGetUserDataById = exports.userDataKey = void 0;
const axios_1 = __importDefault(require("axios"));
const swr_1 = __importDefault(require("swr")); // Replace with your Axios instance setup
const toast_1 = require("../consts/toast");
const localstorage_1 = require("../utils/functions/localstorage");
const AxiosInstance_1 = require("./axios/AxiosInstance");
exports.userDataKey = 'user-data';
const fetchUserDataById = async (id) => {
    const res = await AxiosInstance_1.AxiosInstence.get(`/user/details/${id}`);
    return res.data;
};
const useGetUserDataById = (userid) => (0, swr_1.default)(userid ? userid : null, fetchUserDataById);
exports.useGetUserDataById = useGetUserDataById;
const fetchUserData = async () => {
    const res = await AxiosInstance_1.AxiosInstence.get('/user/data');
    return res.data;
};
const useGetUserData = (userid) => (0, swr_1.default)(userid ? `user-data` : null, fetchUserData);
exports.useGetUserData = useGetUserData;
const loginUser = async (email, password) => {
    const data = (await axios_1.default.post('http://localhost:5000/api/auth/login', {
        email,
        password
    })).data;
    (0, localstorage_1.updateTokens)(data);
};
exports.loginUser = loginUser;
const registerUser = async (email, username, password) => {
    (await axios_1.default.post('http://localhost:5000/api/auth/register', {
        email,
        username,
        password
    }));
    await (0, exports.loginUser)(email, password);
};
exports.registerUser = registerUser;
const logout = async () => {
    try {
        const refreshToken = (0, localstorage_1.getAuthTokenByName)(localstorage_1.refreshTokenName);
        (await axios_1.default.post('http://localhost:5000/api/auth/logout', {}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        }));
        (0, localstorage_1.removeAuthTokens)();
    }
    catch {
        (0, toast_1.showToast)('failed to logout', "error");
    }
};
exports.logout = logout;
const getLogin = async (username, password) => {
    try {
        await (0, exports.loginUser)(username, password);
        (0, toast_1.showToast)('login successfully', "success");
        return true;
    }
    catch (error) {
        (0, toast_1.showToast)('failed to login', "error");
        return;
    }
};
exports.getLogin = getLogin;
const editProfile = async (userId, editedProfile) => {
    try {
        (await AxiosInstance_1.AxiosInstence.put(`user/update`, editedProfile)).data;
        (0, toast_1.showToast)('successfully update profile', "success");
    }
    catch (error) {
        (0, toast_1.showToast)('failed to edit post', "error");
    }
};
exports.editProfile = editProfile;
const saveUserContext = async (userContext) => {
    try {
        (await AxiosInstance_1.AxiosInstence.post(`user/context/create`, userContext));
    }
    catch (error) {
        (0, toast_1.showToast)('failed to save user context', "error");
    }
};
exports.saveUserContext = saveUserContext;
const checkUserContext = async () => {
    try {
        return (await AxiosInstance_1.AxiosInstence.get(`user/context/check`)).data;
    }
    catch (error) {
        (0, toast_1.showToast)('failed to check user context', "error");
    }
};
exports.checkUserContext = checkUserContext;
const googleSignin = async (credential) => {
    const tokens = (await axios_1.default.post('http://localhost:5000/api/auth/login/google', {
        credential,
    })).data;
    (0, localstorage_1.updateTokens)(tokens);
    console.log('after server valid', tokens);
};
exports.googleSignin = googleSignin;
//# sourceMappingURL=userService.js.map