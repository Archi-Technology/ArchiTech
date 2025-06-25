'use client';
import './index.scss';
import type React from 'react';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/logoNewBlack.png';
import loginImage from '../../assets/images/login.png';
import { enterModeOptions, enterModeText } from '../../consts/login';
import { showToast } from '../../consts/toast';
import { useUser } from '../../contexts/userContext';
import { EneterModes } from '../../enums/login';
import {
  googleSignin,
  loginUser,
  registerUser,
} from '../../services/userService';
import { EnterMode } from './EnterMode';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, Divider } from '@mui/material';
import { type CredentialResponse, GoogleLogin } from '@react-oauth/google';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import '@fortawesome/fontawesome-free/css/all.min.css';

type FormInputs = {
  username: string;
  password: string;
  email: string;
};

interface IProp {
  enterMode: EneterModes;
  setEnterMode: React.Dispatch<React.SetStateAction<EneterModes>>;
  onRegister: (
    email: string,
    username: string,
    password: string,
  ) => Promise<void>;
  onLogin: (email: string, password: string) => Promise<void>;
  onGoogleSignIn: (credentialResponse: CredentialResponse) => Promise<void>;
}

export const LoginCard: React.FC<IProp> = ({
  onLogin,
  onRegister,
  enterMode,
  setEnterMode,
  onGoogleSignIn,
}: IProp) => {
  const isRegisterMode = useMemo(
    () => enterMode === EneterModes.REGISTER,
    [enterMode],
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormInputs>({
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const googleErrorMessage = useCallback(() => {
    showToast('failed to sign in with google', 'error');
  }, []);

  const onSubmit: SubmitHandler<FormInputs> = useCallback(
    async (data) => {
      if (enterMode == EneterModes.REGISTER) {
        await onRegister(data!.email, data.username, data.password);
      } else {
        await onLogin(data.email, data.password);
      }
    },
    [enterMode, onRegister, onLogin],
  );

  return (
    <div className="login-card">
      <div className="header">
        <span className="title">
          {enterMode === EneterModes.LOGIN
            ? 'Log in to your account'
            : 'Register an account'}
        </span>
        <span className="desc">
          {enterMode === EneterModes.LOGIN
            ? 'Welcome back! Select your login method'
            : 'Register a new account to use ArchiTech'}
        </span>
      </div>

      <div className="card-data">
        <EnterMode
          selected={enterMode}
          options={enterModeOptions}
          onSelect={setEnterMode}
        />
        <div
          className="google-button-container"
          style={{
            borderRadius: '50px',
            padding: '10px',
          }}
        >
          <GoogleLogin
            width={370}
            onSuccess={onGoogleSignIn}
            onError={googleErrorMessage}
          />
        </div>

        <Divider sx={{ mb: 2, mt: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
            or continue with email
          </Typography>
        </Divider>

        <Box sx={{ width: '100%' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field (always shown) */}
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            pl: 0.5,
                          }}
                        >
                          <EmailIcon color="action" fontSize="medium" />
                        </Box>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            {/* Username Field (only for register) */}
            {isRegisterMode && (
              <Controller
                name="username"
                control={control}
                rules={{
                  required: 'Username is required',
                  minLength: {
                    value: 4,
                    message: 'Username must be at least 4 characters',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type='username'
                    placeholder="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              pl: 0.5,
                            }}
                          >
                            <PersonIcon color="action" fontSize="medium" />
                          </Box>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            )}

            {/* Password Field (always shown) */}
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            pl: 0.5,
                          }}
                        >
                          <LockIcon color="action" fontSize="medium" />
                        </Box>
                      </InputAdornment>
                    ),
                  }}
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
                '&:hover': {
                  backgroundColor: '#6030d0',
                },
                textTransform: 'none',
              }}
            >
              {isRegisterMode ? 'Register' : 'Sign In'}
            </Button>
          </form>
        </Box>

        <Typography
          variant="body2"
          sx={{
            mt: 1,
            textAlign: 'center',
          }}
        >
          {isRegisterMode
            ? 'Already have an account?'
            : 'Do not have an account?'}
          <span
            style={{
              color: 'rgb(57, 13, 255)',
              cursor: 'pointer',
              marginLeft: '5px',
            }}
            onClick={() =>
              setEnterMode(
                isRegisterMode ? EneterModes.LOGIN : EneterModes.REGISTER,
              )
            }
          >
            {isRegisterMode ? 'Sign In' : 'Register'}
          </span>
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            mt: 3,
            display: 'block',
            textAlign: 'center',
          }}
        >
          Copyright © ArchiTech 2025
        </Typography>
      </div>
    </div>
  );
};

const LoginContainer: React.FC = () => {
  const { setUserData } = useUser();
  const [enterMode, setEnterMode] = useState<EneterModes>(EneterModes.LOGIN);

  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (enterModeFunction: Function, ...args: any[]) => {
      try {
        const res = await enterModeFunction(...args);
        navigate('/projects');
        showToast(`successfully ${enterModeText[enterMode]}`, 'success');
      } catch (error) {
        showToast(`failed to ${enterModeText[enterMode]}`, 'error');
      }
    },
    [navigate, setUserData, enterMode],
  );

  const onLogin = useCallback(
    async (email: string, password: string) => {
      await onSubmit(loginUser, email, password);
    },
    [loginUser, onSubmit],
  );

  const onRegister = useCallback(
    async (email: string, username: string, password: string) => {
      await onSubmit(registerUser, email, username, password);
    },
    [loginUser, onSubmit],
  );

  const onGoogleSignIn = useCallback(
    async (credentialResponse: CredentialResponse) => {
      await onSubmit(googleSignin, credentialResponse.credential);
    },
    [onSubmit],
  );

  return (
    <LoginCard
      enterMode={enterMode}
      setEnterMode={setEnterMode}
      onLogin={onLogin}
      onRegister={onRegister}
      onGoogleSignIn={onGoogleSignIn}
    />
  );
};

export const LoginScreen: React.FC = () => {
  return (
    <div className="login-screen">
      <div className="logo-container">
        <img
          src={logo || '/placeholder.svg'}
          alt="ArchiTech"
          className="logo"
        />
      </div>
      <div className="login-container">
        <div className="login-form">
          <LoginContainer />
        </div>
      </div>
      <div className="login-gif">
        <img
          src={loginImage || '/placeholder.svg'}
          alt="loginImage"
          className="login-image"
        />
        <div className="text-wrapper">
          <h2 className="text one">
            Meet your cloud infrastructure design-to-code app{' '}
          </h2>
          <p className="text two">
            Architech design to code approach lets you build your cloud
            infrastructure in real time in a beautiful, intuitive way.
          </p>
        </div>
      </div>
    </div>
  );
};
