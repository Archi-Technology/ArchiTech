import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { checkUserContext } from '../../services/userService';
const NeededAssistantCheck = ({ openPopup }) => {
    useEffect(() => {
        const checkAssistant = async () => {
            const isNeeded = await checkUserContext();
            if (isNeeded) {
                openPopup();
            }
        };
        checkAssistant();
    }, []);
    return (_jsx(_Fragment, {}));
};
export default NeededAssistantCheck;
//# sourceMappingURL=index.js.map