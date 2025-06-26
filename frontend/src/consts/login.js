"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enterModeOptions = exports.enterModeText = void 0;
const login_1 = require("../enums/login");
exports.enterModeText = {
    [login_1.EneterModes.LOGIN]: 'login',
    [login_1.EneterModes.REGISTER]: 'register',
};
exports.enterModeOptions = [
    {
        key: login_1.EneterModes.LOGIN,
        title: exports.enterModeText[login_1.EneterModes.LOGIN]
    },
    {
        key: login_1.EneterModes.REGISTER,
        title: exports.enterModeText[login_1.EneterModes.REGISTER]
    }
];
//# sourceMappingURL=login.js.map