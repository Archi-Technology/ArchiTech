import { EneterModes } from "../enums/login";
export const enterModeText = {
    [EneterModes.LOGIN]: 'login',
    [EneterModes.REGISTER]: 'register',
};
export const enterModeOptions = [
    {
        key: EneterModes.LOGIN,
        title: enterModeText[EneterModes.LOGIN]
    },
    {
        key: EneterModes.REGISTER,
        title: enterModeText[EneterModes.REGISTER]
    }
];
//# sourceMappingURL=login.js.map