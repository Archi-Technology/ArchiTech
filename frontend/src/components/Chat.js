import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import './Chat.css';
import apiService from '../services/axios/AxiosInstance';
export default function Chat() {
    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState([]);
    const [visible, setVisible] = useState(false);
    const ask = async () => {
        if (!question.trim())
            return;
        const newMessages = [...messages, { role: 'user', content: question }];
        setMessages(newMessages);
        setQuestion('');
        try {
            const res = await apiService.apiClient.post('/chat', {
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
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: "toggle-chat-btn", style: { color: 'whtie', backgroundColor: 'black' }, onClick: () => setVisible(!visible), children: visible ? '✖ Close' : '💬 Ask' }), visible && (_jsxs("div", { className: "chat-popup", children: [_jsx("div", { className: "chat-messages", children: messages.map((msg, i) => (_jsx("div", { className: `message ${msg.role}`, children: msg.content }, i))) }), _jsxs("div", { className: "chat-input", children: [_jsx("input", { value: question, onChange: (e) => setQuestion(e.target.value), placeholder: "Ask me anything...", onKeyDown: (e) => e.key === 'Enter' && ask() }), _jsx("button", { style: { color: 'whtie', backgroundColor: 'black' }, onClick: ask, children: "send" })] })] }))] }));
}
//# sourceMappingURL=Chat.js.map