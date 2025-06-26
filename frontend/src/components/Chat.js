"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Chat;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("./Chat.css");
const AxiosInstance_1 = require("../services/axios/AxiosInstance");
function Chat() {
    const [question, setQuestion] = (0, react_1.useState)('');
    const [messages, setMessages] = (0, react_1.useState)([]);
    const [visible, setVisible] = (0, react_1.useState)(false);
    const ask = async () => {
        if (!question.trim())
            return;
        const newMessages = [...messages, { role: 'user', content: question }];
        setMessages(newMessages);
        setQuestion('');
        try {
            const res = await AxiosInstance_1.AxiosInstence.post('/chat', {
                question,
            });
            setMessages([
                ...newMessages,
                { role: 'assistant', content: res.data.message },
            ]);
        }
        catch (error) {
            setMessages([
                ...newMessages,
                { role: 'assistant', content: '❌ Error' },
            ]);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { className: "toggle-chat-btn", style: { color: 'whtie', backgroundColor: 'black' }, onClick: () => setVisible(!visible), children: visible ? '✖ Close' : '💬 Ask' }), visible && ((0, jsx_runtime_1.jsxs)("div", { className: "chat-popup", children: [(0, jsx_runtime_1.jsx)("div", { className: "chat-messages", children: messages.map((msg, i) => ((0, jsx_runtime_1.jsx)("div", { className: `message ${msg.role}`, children: msg.content }, i))) }), (0, jsx_runtime_1.jsxs)("div", { className: "chat-input", children: [(0, jsx_runtime_1.jsx)("input", { value: question, onChange: (e) => setQuestion(e.target.value), placeholder: "Ask me anything...", onKeyDown: (e) => e.key === 'Enter' && ask() }), (0, jsx_runtime_1.jsx)("button", { style: { color: 'whtie', backgroundColor: 'black' }, onClick: ask, children: "send" })] })] }))] }));
}
//# sourceMappingURL=Chat.js.map