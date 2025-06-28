import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/userContext';
import appLogo from '../../assets/logoIcon.png';
import './index.scss'; // Import the CSS styles for the navbar
import apiService from '../../services/axios/AxiosInstance';
const Navbar = () => {
    const { setUserData, user } = useUser();
    const { logoutUser } = useUser();
    return (_jsxs("div", { className: "navbar", children: [_jsx("div", { className: "navbarLeft", children: _jsxs("div", { className: "logoContainer", children: [_jsx("img", { src: appLogo, alt: "ArchiTech Logo", className: "logoImage", style: { width: 64, height: 64 } }), _jsx("div", { className: "appName", children: "ArchiTech" }), _jsx(Link, { to: "/projects", children: _jsx("button", { className: "navButton", children: "Projects" }) })] }) }), _jsx("div", { className: "navbarRight", children: _jsx("button", { className: "navButton", onClick: async () => {
                        try {
                            const response = await apiService.apiClient.post('/auth/logout');
                            if (response.status === 200) {
                                // setUserData(null); // Clear user data
                                window.location.href = '/login'; // Redirect to login
                            }
                        }
                        catch (error) {
                            console.error('Logout failed:', error);
                        }
                    }, children: "Logout" }) })] }));
};
export default Navbar;
//# sourceMappingURL=index.js.map