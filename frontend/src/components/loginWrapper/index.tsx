import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/userContext";
import { useGetUserData } from "../../services/userService";
import { CircularProgress } from "@mui/material";


interface IProp {
    children: React.ReactNode;
}

export const LoginWrapper: React.FC<IProp> = ({ children }: IProp) => {
    const authtoken = localStorage.getItem('accessToken')
    const { setUserData, user } = useUser();
    const { data, isLoading } = useGetUserData(authtoken ? authtoken : null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authtoken && !user) {
            navigate('/login')
        }
        else if (data) {

            setUserData(data)

        }
    }, [data, authtoken, user, navigate, setUserData]);

    if (isLoading) return <CircularProgress />
    return <>{children}</>
}

//if no auth token - /login
// interface IUserSeesionHanler {
//     userid: string
// }
// const UserSeesionHanler: React.FC<IUserSeesionHanler> = ({ userid }: IUserSeesionHanler) => {
//     const { data, isLoading } = useGetUserData(userid);
//     const { setUserData, user } = useUser();

//     useEffect(() => {
//         if(data) {
//             setUserData(data)
//         }
//     },[data])
//     if (isLoading) return <CircularProgress />
// }