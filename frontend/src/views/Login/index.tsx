import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import logo from '../../assets/images/google.png';
import { enterModeOptions, enterModeText } from "../../consts/login";
import { showToast } from "../../consts/toast";
import { useUser } from "../../contexts/userContext";
import { EneterModes } from "../../enums/login";
import { googleSignin, loginUser, registerUser } from "../../services/userService";
import { EnterMode } from "./EnterMode";
import './index.scss';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

type FormInputs = {
    username: string;
    password: string;
    email: string
}

interface IProp {
    enterMode: EneterModes;
    setEnterMode: React.Dispatch<React.SetStateAction<EneterModes>>;
    onRegister: (email: string, username: string, password: string) => Promise<void>;
    onLogin: (username: string, password: string) => Promise<void>;
    onGoogleSignIn: (credentialResponse: CredentialResponse) => Promise<void>;
}

export const LoginCard: React.FC<IProp> = ({ onLogin, onRegister, enterMode, setEnterMode, onGoogleSignIn }: IProp) => {

    const isRegisterMode = useMemo(() => enterMode === EneterModes.REGISTER, [enterMode])

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<FormInputs>({
        mode: 'onChange'
    });

    const googleErrorMessage = useCallback(() => {
        showToast('failed to sign in with goole', 'error')
    }, []);

    const onSubmit: SubmitHandler<FormInputs> = useCallback(async (data) => {
        if (enterMode == EneterModes.REGISTER) {
            await onRegister(data!.email, data.username, data.password)
        }
        else {
            await onLogin(data.username, data.password)
        }
    }, [enterMode, onRegister, onLogin])


    return <div className="login-card">

        <div className="header">
            <span className="title">Welcome to TripNet</span>
            <span className="desc">Connect with friends and share your moments</span>
        </div>

        <div className="card-data">
            <EnterMode selected={enterMode} options={enterModeOptions} onSelect={setEnterMode} />
            <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Conditionally Render Email Field */}
                    {isRegisterMode && (
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address",
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />
                    )}

                    <Controller
                        name="username"
                        control={control}
                        rules={{
                            required: "username is required",
                            minLength: {
                                value: 4,
                                message: "username must be at least 4 characters",
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="username"
                                type="username"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.username}
                                helperText={errors.username?.message}
                            />
                        )}
                    />

                    {/* Password Field */}
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        )}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2, py: 1.5 }}
                    >
                        {isRegisterMode ? "Register" : "Sign In"}
                    </Button>
                </form>
            </Box>
        </div>

        <div className="footer">
            <GoogleLogin width={370} onSuccess={onGoogleSignIn} onError={googleErrorMessage} />
        </div>
    </div>
}

const LoginContainer: React.FC = () => {
    const { setUserData } = useUser();
    const [enterMode, setEnterMode] = useState<EneterModes>(EneterModes.LOGIN);

    const navigate = useNavigate();

    const onSubmit = useCallback(async (enterModeFunction: Function, ...args: any[]) => {

        try {
            await enterModeFunction(...args)
            navigate('/');
            showToast(`successfully ${enterModeText[enterMode]}`, "success")

        }
        catch (error) {
            showToast(`failed to ${enterModeText[enterMode]}`, "error")
        }
    }
        , [navigate, setUserData, enterMode]);


    const onLogin = useCallback(async (username: string, password: string) => {
        await onSubmit(loginUser, username, password)
    }, [loginUser, onSubmit]);

    const onRegister = useCallback(async (email: string, username: string, password: string) => {
        await onSubmit(registerUser, email, username, password)
    }, [loginUser, onSubmit]);

    const onGoogleSignIn = useCallback(async (credentialResponse: CredentialResponse) => {
        await onSubmit(googleSignin, credentialResponse.credential)
    }, [onSubmit]);

    return <LoginCard enterMode={enterMode} setEnterMode={setEnterMode} onLogin={onLogin} onRegister={onRegister} onGoogleSignIn={onGoogleSignIn} />
}

export const LoginScreen: React.FC = () => {
    return <div className="login-screen">
        <div className="login-container">
            <LoginContainer />
        </div>
    </div>
}