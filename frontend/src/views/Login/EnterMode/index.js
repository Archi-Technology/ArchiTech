import { jsx as _jsx } from "react/jsx-runtime";
import classNames from "classnames";
import { useCallback, useMemo } from "react";
import './index.scss';
export const EnterMode = ({ selected, options, onSelect }) => {
    const onChange = useCallback((option) => onSelect(option.key), [onSelect]);
    const tabs = useMemo(() => options.map((option) => _jsx("div", { className: classNames('tab', { 'selected': option.key === selected }), onClick: () => onChange(option), children: option.title })), [options, selected]);
    return _jsx("div", { className: "enter-mode" });
};
//# sourceMappingURL=index.js.map