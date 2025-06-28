'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/logoNewBlack.png';
import loginImage from '../../assets/images/login.png';
import { enterModeOptions, enterModeText } from '../../consts/login';
import { showToast } from '../../consts/toast';
import { useUser } from '../../contexts/userContext';
import { EneterModes } from '../../enums/login';
import { googleSignin, loginUser, registerUser, } from '../../services/userService';
import { EnterMode } from './EnterMode';
import './index.scss';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, Divider } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
export const LoginCard = ({ onLogin, onRegister, enterMode, setEnterMode, onGoogleSignIn, }) => {
    const isRegisterMode = useMemo(() => enterMode === EneterModes.REGISTER, [enterMode]);
    const { control, handleSubmit, formState: { errors, isDirty, isValid }, } = useForm({
        mode: 'onChange',
    });
    const navigate = useNavigate();
    const googleErrorMessage = useCallback(() => {
        showToast('failed to sign in with google', 'error');
    }, []);
    const onSubmit = useCallback(async (data) => {
        if (enterMode == EneterModes.REGISTER) {
            await onRegister(data.email, data.username, data.password);
        }
        else {
            await onLogin(data.email, data.password);
        }
    }, [enterMode, onRegister, onLogin]);
    return (_jsxs("div", { className: "login-card", children: [_jsxs("div", { className: "header", children: [_jsx("span", { className: "title", children: enterMode === EneterModes.LOGIN ? 'Log in to your account' : 'Register an account' }), _jsx("span", { className: "desc", children: enterMode === EneterModes.LOGIN
                            ? 'Welcome back! Select your login method'
                            : 'Register a new account to use ArchiTech' })] }), _jsxs("div", { className: "card-data", children: [_jsx(EnterMode, { selected: enterMode, options: enterModeOptions, onSelect: setEnterMode }), _jsx("div", { className: "google-button-container", style: {
                            borderRadius: '50px',
                            padding: '10px',
                        }, children: _jsx(GoogleLogin, { width: 370, onSuccess: onGoogleSignIn, onError: googleErrorMessage }) }), _jsx(Divider, { sx: { mb: 2, mt: 3 }, children: _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { px: 1 }, children: "or continue with email" }) }), _jsxs(Box, { sx: { width: '100%' }, children: [_jsx("link", { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [isRegisterMode && (_jsx(Controller, { name: "email", control: control, rules: {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                message: 'Invalid email address',
                                            },
                                        }, render: ({ field }) => (_jsx(TextField, { ...field, placeholder: "Enter your email address", variant: "outlined", fullWidth: true, margin: "normal", error: !!errors.email, helperText: errors.email?.message, InputProps: {
                                                startAdornment: (_jsx(Box, { sx: { mr: 1, color: 'text.secondary' }, children: _jsx("i", { className: "fas fa-envelope" }) })),
                                            } })) })), _jsx(Controller, { name: isRegisterMode ? 'username' : 'email', control: control, rules: {
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
                                        }, render: ({ field }) => (_jsx(TextField, { ...field, placeholder: isRegisterMode
                                                ? 'Enter your username'
                                                : 'Enter your email address', variant: "outlined", fullWidth: true, margin: "normal", error: isRegisterMode ? !!errors.username : !!errors.email, helperText: isRegisterMode
                                                ? errors.username?.message
                                                : errors.email?.message, InputProps: {
                                                startAdornment: (_jsx(Box, { sx: { mr: 1, color: 'text.secondary' }, children: _jsx("i", { className: "fas fa-envelope" }) })),
                                            } })) }), _jsx(Controller, { name: "password", control: control, rules: {
                                            required: 'Password is required',
                                            minLength: {
                                                value: 6,
                                                message: 'Password must be at least 6 characters',
                                            },
                                        }, render: ({ field }) => (_jsx(TextField, { ...field, placeholder: "Enter your password", type: "password", variant: "outlined", fullWidth: true, margin: "normal", error: !!errors.password, helperText: errors.password?.message, InputProps: {
                                                startAdornment: (_jsx(Box, { sx: { mr: 1, color: 'text.secondary' }, children: _jsx("i", { className: "fas fa-lock" }) })),
                                            } })) }), _jsx(Button, { type: "submit", variant: "contained", fullWidth: true, className: "submit-button", sx: {
                                            mt: 2,
                                            py: 1.5,
                                            '&:hover': {
                                                backgroundColor: '#6030d0',
                                            },
                                            textTransform: 'none',
                                        }, children: isRegisterMode ? 'Register' : 'Sign In' })] })] }), _jsxs(Typography, { variant: "body2", sx: {
                            mt: 1,
                            textAlign: 'center',
                        }, children: [isRegisterMode
                                ? 'Already have an account?'
                                : 'Do not have an account?', _jsx("span", { style: {
                                    color: 'rgb(57, 13, 255)',
                                    cursor: 'pointer',
                                    marginLeft: '5px',
                                }, onClick: () => setEnterMode(isRegisterMode ? EneterModes.LOGIN : EneterModes.REGISTER), children: isRegisterMode ? 'Sign In' : 'Register' })] }), _jsx(Typography, { variant: "caption", color: "text.secondary", sx: {
                            mt: 3,
                            display: 'block',
                            textAlign: 'center',
                        }, children: "Copyright \u00A9 ArchiTech 2025" })] })] }));
};
const LoginContainer = () => {
    const { setUserData } = useUser();
    const [enterMode, setEnterMode] = useState(EneterModes.LOGIN);
    const navigate = useNavigate();
    const onSubmit = useCallback(async (enterModeFunction, ...args) => {
        try {
            const res = await enterModeFunction(...args);
            navigate('/projects');
            showToast(`successfully ${enterModeText[enterMode]}`, 'success');
        }
        catch (error) {
            showToast(`failed to ${enterModeText[enterMode]}`, 'error');
        }
    }, [navigate, setUserData, enterMode]);
    const onLogin = useCallback(async (email, password) => {
        await onSubmit(loginUser, email, password);
    }, [loginUser, onSubmit]);
    const onRegister = useCallback(async (email, username, password) => {
        await onSubmit(registerUser, email, username, password);
    }, [loginUser, onSubmit]);
    const onGoogleSignIn = useCallback(async (credentialResponse) => {
        await onSubmit(googleSignin, credentialResponse.credential);
    }, [onSubmit]);
    return (_jsx(LoginCard, { enterMode: enterMode, setEnterMode: setEnterMode, onLogin: onLogin, onRegister: onRegister, onGoogleSignIn: onGoogleSignIn }));
};
export const LoginScreen = () => {
    return (_jsxs("div", { className: "login-screen", children: [_jsx("div", { className: "logo-container", children: _jsx("img", { src: logo || '/placeholder.svg', alt: "ArchiTech", className: "logo" }) }), _jsx("div", { className: "login-container", children: _jsx("div", { className: "login-form", children: _jsx(LoginContainer, {}) }) }), _jsxs("div", { className: "login-gif", children: [_jsx("img", { src: loginImage || '/placeholder.svg', alt: "loginImage", className: "login-image" }), _jsxs("div", { className: "text-wrapper", children: [_jsxs("h2", { className: "text one", children: ["Meet your cloud infrastructure design-to-code app", ' '] }), _jsx("p", { className: "text two", children: "Architech design to code approach lets you build your cloud infrastructure in real time in a beautiful, intuitive way." })] })] })] }));
};
//# sourceMappingURL=index.js.map