import { EneterModes } from "../enums/login";
import { IEnterModeOption } from "../interfaces/login";



export const enterModeText: Record<EneterModes, string> = {
    [EneterModes.LOGIN]: 'login',
    [EneterModes.REGISTER]: 'register',
}

export const enterModeOptions: IEnterModeOption[] = [
    {
        key: EneterModes.LOGIN,
        title: enterModeText[EneterModes.LOGIN]
    },
    {
        key: EneterModes.REGISTER,
        title: enterModeText[EneterModes.REGISTER]
    }
]
