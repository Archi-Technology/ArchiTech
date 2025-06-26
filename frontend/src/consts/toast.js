"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showToast = void 0;
const react_toastify_1 = require("react-toastify");
const showToast = (message, type = "info") => {
    react_toastify_1.toast[type](message);
};
exports.showToast = showToast;
//# sourceMappingURL=toast.js.map