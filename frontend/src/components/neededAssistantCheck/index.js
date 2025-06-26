"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const userService_1 = require("../../services/userService");
const NeededAssistantCheck = ({ openPopup }) => {
    (0, react_1.useEffect)(() => {
        const checkAssistant = async () => {
            const isNeeded = await (0, userService_1.checkUserContext)();
            if (isNeeded) {
                openPopup();
            }
        };
        checkAssistant();
    }, []);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
};
exports.default = NeededAssistantCheck;
//# sourceMappingURL=index.js.map