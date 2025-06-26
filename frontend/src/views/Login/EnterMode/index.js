"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterMode = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = require("react");
require("./index.scss");
const EnterMode = ({ selected, options, onSelect }) => {
    const onChange = (0, react_1.useCallback)((option) => onSelect(option.key), [onSelect]);
    const tabs = (0, react_1.useMemo)(() => options.map((option) => (0, jsx_runtime_1.jsx)("div", { className: (0, classnames_1.default)('tab', { 'selected': option.key === selected }), onClick: () => onChange(option), children: option.title })), [options, selected]);
    return (0, jsx_runtime_1.jsx)("div", { className: "enter-mode" });
};
exports.EnterMode = EnterMode;
//# sourceMappingURL=index.js.map