"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUser = exports.UserProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const userService_1 = require("../services/userService");
const UserContext = (0, react_1.createContext)(null);
const UserProvider = ({ children }) => {
    const [user, setUser] = (0, react_1.useState)();
    const setUserData = (0, react_1.useCallback)((user) => {
        setUser(user);
    }, [setUser]);
    const logoutUser = (0, react_1.useCallback)(async () => {
        await (0, userService_1.logout)();
        setUser(undefined);
    }, [setUser]);
    return ((0, jsx_runtime_1.jsx)(UserContext.Provider, { value: { user, setUserData, logoutUser }, children: children }));
};
exports.UserProvider = UserProvider;
// Custom hook to use the UserContext
const useUser = () => {
    const context = (0, react_1.useContext)(UserContext);
    if (!context)
        throw new Error('useUser must be used within a UserProvider');
    return context;
};
exports.useUser = useUser;
//# sourceMappingURL=userContext.js.map