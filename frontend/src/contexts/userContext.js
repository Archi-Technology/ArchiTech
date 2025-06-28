import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useState } from 'react';
import { logout } from '../services/userService';
const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const setUserData = useCallback((user) => {
        setUser(user);
    }, [setUser]);
    const logoutUser = useCallback(async () => {
        await logout();
        setUser(undefined);
    }, [setUser]);
    return (_jsx(UserContext.Provider, { value: { user, setUserData, logoutUser }, children: children }));
};
// Custom hook to use the UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context)
        throw new Error('useUser must be used within a UserProvider');
    return context;
};
//# sourceMappingURL=userContext.js.map