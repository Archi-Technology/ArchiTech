import classNames from "classnames";
import React, { useCallback, useMemo } from "react";
import { EneterModes } from "../../../enums/login";
import './index.scss'
import { IEnterModeOption } from "../../../interfaces/login";


interface IProp {
    selected: EneterModes;
    options: IEnterModeOption[];
    onSelect: React.Dispatch<React.SetStateAction<EneterModes>>;
}

export const EnterMode: React.FC<IProp> = ({selected, options, onSelect}: IProp) => {
    const onChange = useCallback((option: IEnterModeOption) => onSelect(option.key),[onSelect])
    const tabs = useMemo(() => options.map((option) => <div className={classNames('tab', {'selected':option.key === selected})} onClick={() => onChange(option)}>{option.title}</div>),[options, selected])
    return <div className="enter-mode">
       
    </div>
}