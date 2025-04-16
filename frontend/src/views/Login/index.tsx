"use client"

import type React from "react"
import { useCallback, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import logo from "../../assets/images/google.png"
import loginImage from "../../assets/images/login.png"
import { enterModeOptions, enterModeText } from "../../consts/login"
import { showToast } from "../../consts/toast"
import { useUser } from "../../contexts/userContext"
import { EneterModes } from "../../enums/login"
import { googleSignin, loginUser, registerUser } from "../../services/userService"
import { EnterMode } from "./EnterMode"
import "./index.scss"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import { Box, Button, TextField, Typography, Divider } from "@mui/material"
import { type CredentialResponse, GoogleLogin } from "@react-oauth/google"

type FormInputs = {
    username: string
    password: string
    email: string
}

interface IProp {
    enterMode: EneterModes
    setEnterMode: React.Dispatch<React.SetStateAction<EneterModes>>
    onRegister: (email: string, username: string, password: string) => Promise<void>
    onLogin: (username: string, password: string) => Promise<void>
    onGoogleSignIn: (credentialResponse: CredentialResponse) => Promise<void>
}

export const LoginCard: React.FC<IProp> = ({ onLogin, onRegister, enterMode, setEnterMode, onGoogleSignIn }: IProp) => {
    const isRegisterMode = useMemo(() => enterMode === EneterModes.REGISTER, [enterMode])

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<FormInputs>({
        mode: "onChange",
    })

    const googleErrorMessage = useCallback(() => {
        showToast("failed to sign in with google", "error")
    }, [])

    const onSubmit: SubmitHandler<FormInputs> = useCallback(
        async (data) => {
            if (enterMode == EneterModes.REGISTER) {
                await onRegister(data!.email, data.username, data.password)
            } else {
                await onLogin(data.username, data.password)
            }
        },
        [enterMode, onRegister, onLogin],
    )

    return (
        <div className="login-card">
            <div className="header">
                <span className="title">Log in to your account</span>
                <span className="desc">Welcome back! Select your login method</span>
            </div>

            <div className="card-data">
                <EnterMode selected={enterMode} options={enterModeOptions} onSelect={setEnterMode} />

                <Button
                    variant="outlined"
                    fullWidth
                    className="provider-button microsoft-button"
                    sx={{
                        mt: 3,
                        mb: 2,
                        py: 1.5,
                        borderColor: "#e0e0e0",
                        color: "#000",
                        justifyContent: "flex-start",
                        paddingLeft: "20px",
                        textTransform: "none",
                    }}
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png"
                        alt="Microsoft"
                        style={{ width: 20, marginRight: 10 }}
                    />
                    Microsoft
                </Button>

                <div className="google-button-container">
                    <GoogleLogin width={370} onSuccess={onGoogleSignIn} onError={googleErrorMessage} />
                </div>

                <Divider sx={{ mb: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
                        OR CONTINUE WITH EMAIL
                    </Typography>
                </Divider>

                <Box sx={{ width: "100%" }}>
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
                            name={isRegisterMode ? "username" : "email"}
                            control={control}
                            rules={{
                                required: isRegisterMode ? "Username is required" : "Email is required",
                                minLength: isRegisterMode
                                    ? {
                                        value: 4,
                                        message: "Username must be at least 4 characters",
                                    }
                                    : undefined,
                                pattern: !isRegisterMode
                                    ? {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Invalid email address",
                                    }
                                    : undefined,
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={isRegisterMode ? "Username" : "Email"}
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
                            className="submit-button"
                            sx={{
                                mt: 2,
                                py: 1.5,
                                backgroundColor: "rgb(121, 62, 245)",
                                "&:hover": {
                                    backgroundColor: "#6030d0",
                                },
                                textTransform: "none",
                            }}
                        >
                            {isRegisterMode ? "Register" : "Sign In"}
                        </Button>
                    </form>
                </Box>

                <Typography
                    variant="body2"
                    sx={{
                        mt: 3,
                        textAlign: "center",
                    }}
                >
                    {isRegisterMode ? "Already have an account?" : "Do not have an account?"}
                    <span
                        style={{
                            color: "rgb(121, 62, 245)",
                            cursor: "pointer",
                            marginLeft: "5px",
                        }}
                        onClick={() => setEnterMode(isRegisterMode ? EneterModes.LOGIN : EneterModes.REGISTER)}
                    >
                        {isRegisterMode ? "Sign In" : "Register"}
                    </span>
                </Typography>

                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                        mt: 3,
                        display: "block",
                        textAlign: "center",
                    }}
                >
                    Copyright © ArchiTech 2025
                </Typography>
            </div>

            <div className="footer">
                <GoogleLogin width={370} onSuccess={onGoogleSignIn} onError={googleErrorMessage} />
            </div>
        </div>
    )
}

const LoginContainer: React.FC = () => {
    const { setUserData } = useUser()
    const [enterMode, setEnterMode] = useState<EneterModes>(EneterModes.LOGIN)

    const navigate = useNavigate()

    const onSubmit = useCallback(
        async (enterModeFunction: Function, ...args: any[]) => {
            try {
                await enterModeFunction(...args)
                navigate("/home")
                showToast(`successfully ${enterModeText[enterMode]}`, "success")
            } catch (error) {
                showToast(`failed to ${enterModeText[enterMode]}`, "error")
            }
        },
        [navigate, setUserData, enterMode],
    )

    const onLogin = useCallback(
        async (username: string, password: string) => {
            await onSubmit(loginUser, username, password)
        },
        [loginUser, onSubmit],
    )

    const onRegister = useCallback(
        async (email: string, username: string, password: string) => {
            await onSubmit(registerUser, email, username, password)
        },
        [loginUser, onSubmit],
    )

    const onGoogleSignIn = useCallback(
        async (credentialResponse: CredentialResponse) => {
            await onSubmit(googleSignin, credentialResponse.credential)
        },
        [onSubmit],
    )

    return (
        <LoginCard
            enterMode={enterMode}
            setEnterMode={setEnterMode}
            onLogin={onLogin}
            onRegister={onRegister}
            onGoogleSignIn={onGoogleSignIn}
        />
    )
}

export const LoginScreen: React.FC = () => {
    return (
        <div className="login-screen">
            <div className="login-container">
                <div className="logo-container">
     
                    <span className="logo-text">ArchiTech</span>
                </div>
                <div className="login-form">
                    <LoginContainer />
                </div>
            </div>
            <div className="login-gif">
                <img src={loginImage || "/placeholder.svg"} alt="loginImage" className="login-image" />
                <div className="text-wrapper">
                    <h2 className="text one">Meet your cloud infrastructure design-to-code app </h2>
                    <p className="text two">
                        Architech design to code approach lets you build your cloud infrastructure in real time in a beautiful,
                        intuitive way.
                    </p>
                </div>
            </div>
        </div>
    )
}
