'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginScreen = exports.LoginCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
require("react-toastify/dist/ReactToastify.css");
const logoNewBlack_png_1 = __importDefault(require("../../assets/logoNewBlack.png"));
const login_png_1 = __importDefault(require("../../assets/images/login.png"));
const login_1 = require("../../consts/login");
const toast_1 = require("../../consts/toast");
const userContext_1 = require("../../contexts/userContext");
const login_2 = require("../../enums/login");
const userService_1 = require("../../services/userService");
const EnterMode_1 = require("./EnterMode");
require("./index.scss");
const react_hook_form_1 = require("react-hook-form");
const material_1 = require("@mui/material");
const google_1 = require("@react-oauth/google");
const LoginCard = ({ onLogin, onRegister, enterMode, setEnterMode, onGoogleSignIn, }) => {
    const isRegisterMode = (0, react_1.useMemo)(() => enterMode === login_2.EneterModes.REGISTER, [enterMode]);
    const { control, handleSubmit, formState: { errors, isDirty, isValid }, } = (0, react_hook_form_1.useForm)({
        mode: 'onChange',
    });
    const navigate = (0, react_router_dom_1.useNavigate)();
    const googleErrorMessage = (0, react_1.useCallback)(() => {
        (0, toast_1.showToast)('failed to sign in with google', 'error');
    }, []);
    const onSubmit = (0, react_1.useCallback)(async (data) => {
        if (enterMode == login_2.EneterModes.REGISTER) {
            await onRegister(data.email, data.username, data.password);
        }
        else {
            await onLogin(data.email, data.password);
        }
    }, [enterMode, onRegister, onLogin]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "login-card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "header", children: [(0, jsx_runtime_1.jsx)("span", { className: "title", children: enterMode === login_2.EneterModes.LOGIN ? 'Log in to your account' : 'Register an account' }), (0, jsx_runtime_1.jsx)("span", { className: "desc", children: enterMode === login_2.EneterModes.LOGIN
                            ? 'Welcome back! Select your login method'
                            : 'Register a new account to use ArchiTech' })] }), (0, jsx_runtime_1.jsxs)("div", { className: "card-data", children: [(0, jsx_runtime_1.jsx)(EnterMode_1.EnterMode, { selected: enterMode, options: login_1.enterModeOptions, onSelect: setEnterMode }), (0, jsx_runtime_1.jsx)("div", { className: "google-button-container", style: {
                            borderRadius: '50px',
                            padding: '10px',
                        }, children: (0, jsx_runtime_1.jsx)(google_1.GoogleLogin, { width: 370, onSuccess: onGoogleSignIn, onError: googleErrorMessage }) }), (0, jsx_runtime_1.jsx)(material_1.Divider, { sx: { mb: 2, mt: 3 }, children: (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", color: "text.secondary", sx: { px: 1 }, children: "or continue with email" }) }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { width: '100%' }, children: [(0, jsx_runtime_1.jsx)("link", { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(onSubmit), children: [isRegisterMode && ((0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: "email", control: control, rules: {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                message: 'Invalid email address',
                                            },
                                        }, render: ({ field }) => ((0, jsx_runtime_1.jsx)(material_1.TextField, { ...field, placeholder: "Enter your email address", variant: "outlined", fullWidth: true, margin: "normal", error: !!errors.email, helperText: errors.email?.message, InputProps: {
                                                startAdornment: ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: { mr: 1, color: 'text.secondary' }, children: (0, jsx_runtime_1.jsx)("i", { className: "fas fa-envelope" }) })),
                                            } })) })), (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: isRegisterMode ? 'username' : 'email', control: control, rules: {
                                            required: isRegisterMode
                                                ? 'Username is required'
                                                : 'Email is required',
                                            minLength: isRegisterMode
                                                ? {
                                                    value: 4,
                                                    message: 'Username must be at least 4 characters',
                                                }
                                                : undefined,
                                            pattern: !isRegisterMode
                                                ? {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                    message: 'Invalid email address',
                                                }
                                                : undefined,
                                        }, render: ({ field }) => ((0, jsx_runtime_1.jsx)(material_1.TextField, { ...field, placeholder: isRegisterMode
                                                ? 'Enter your username'
                                                : 'Enter your email address', variant: "outlined", fullWidth: true, margin: "normal", error: isRegisterMode ? !!errors.username : !!errors.email, helperText: isRegisterMode
                                                ? errors.username?.message
                                                : errors.email?.message, InputProps: {
                                                startAdornment: ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: { mr: 1, color: 'text.secondary' }, children: (0, jsx_runtime_1.jsx)("i", { className: "fas fa-envelope" }) })),
                                            } })) }), (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: "password", control: control, rules: {
                                            required: 'Password is required',
                                            minLength: {
                                                value: 6,
                                                message: 'Password must be at least 6 characters',
                                            },
                                        }, render: ({ field }) => ((0, jsx_runtime_1.jsx)(material_1.TextField, { ...field, placeholder: "Enter your password", type: "password", variant: "outlined", fullWidth: true, margin: "normal", error: !!errors.password, helperText: errors.password?.message, InputProps: {
                                                startAdornment: ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: { mr: 1, color: 'text.secondary' }, children: (0, jsx_runtime_1.jsx)("i", { className: "fas fa-lock" }) })),
                                            } })) }), (0, jsx_runtime_1.jsx)(material_1.Button, { type: "submit", variant: "contained", fullWidth: true, className: "submit-button", sx: {
                                            mt: 2,
                                            py: 1.5,
                                            '&:hover': {
                                                backgroundColor: '#6030d0',
                                            },
                                            textTransform: 'none',
                                        }, children: isRegisterMode ? 'Register' : 'Sign In' })] })] }), (0, jsx_runtime_1.jsxs)(material_1.Typography, { variant: "body2", sx: {
                            mt: 1,
                            textAlign: 'center',
                        }, children: [isRegisterMode
                                ? 'Already have an account?'
                                : 'Do not have an account?', (0, jsx_runtime_1.jsx)("span", { style: {
                                    color: 'rgb(57, 13, 255)',
                                    cursor: 'pointer',
                                    marginLeft: '5px',
                                }, onClick: () => setEnterMode(isRegisterMode ? login_2.EneterModes.LOGIN : login_2.EneterModes.REGISTER), children: isRegisterMode ? 'Sign In' : 'Register' })] }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "caption", color: "text.secondary", sx: {
                            mt: 3,
                            display: 'block',
                            textAlign: 'center',
                        }, children: "Copyright \u00A9 ArchiTech 2025" })] })] }));
};
exports.LoginCard = LoginCard;
const LoginContainer = () => {
    const { setUserData } = (0, userContext_1.useUser)();
    const [enterMode, setEnterMode] = (0, react_1.useState)(login_2.EneterModes.LOGIN);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const onSubmit = (0, react_1.useCallback)(async (enterModeFunction, ...args) => {
        try {
            const res = await enterModeFunction(...args);
            navigate('/projects');
            (0, toast_1.showToast)(`successfully ${login_1.enterModeText[enterMode]}`, 'success');
        }
        catch (error) {
            (0, toast_1.showToast)(`failed to ${login_1.enterModeText[enterMode]}`, 'error');
        }
    }, [navigate, setUserData, enterMode]);
    const onLogin = (0, react_1.useCallback)(async (email, password) => {
        await onSubmit(userService_1.loginUser, email, password);
    }, [userService_1.loginUser, onSubmit]);
    const onRegister = (0, react_1.useCallback)(async (email, username, password) => {
        await onSubmit(userService_1.registerUser, email, username, password);
    }, [userService_1.loginUser, onSubmit]);
    const onGoogleSignIn = (0, react_1.useCallback)(async (credentialResponse) => {
        await onSubmit(userService_1.googleSignin, credentialResponse.credential);
    }, [onSubmit]);
    return ((0, jsx_runtime_1.jsx)(exports.LoginCard, { enterMode: enterMode, setEnterMode: setEnterMode, onLogin: onLogin, onRegister: onRegister, onGoogleSignIn: onGoogleSignIn }));
};
const LoginScreen = () => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "login-screen", children: [(0, jsx_runtime_1.jsx)("div", { className: "logo-container", children: (0, jsx_runtime_1.jsx)("img", { src: logoNewBlack_png_1.default || '/placeholder.svg', alt: "ArchiTech", className: "logo" }) }), (0, jsx_runtime_1.jsx)("div", { className: "login-container", children: (0, jsx_runtime_1.jsx)("div", { className: "login-form", children: (0, jsx_runtime_1.jsx)(LoginContainer, {}) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "login-gif", children: [(0, jsx_runtime_1.jsx)("img", { src: login_png_1.default || '/placeholder.svg', alt: "loginImage", className: "login-image" }), (0, jsx_runtime_1.jsxs)("div", { className: "text-wrapper", children: [(0, jsx_runtime_1.jsxs)("h2", { className: "text one", children: ["Meet your cloud infrastructure design-to-code app", ' '] }), (0, jsx_runtime_1.jsx)("p", { className: "text two", children: "Architech design to code approach lets you build your cloud infrastructure in real time in a beautiful, intuitive way." })] })] })] }));
};
exports.LoginScreen = LoginScreen;
//# sourceMappingURL=index.js.map