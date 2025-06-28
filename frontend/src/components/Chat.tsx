import { useState } from 'react';
import axios from 'axios';
import './Chat.css';
import apiService from '../services/axios/AxiosInstance';
import { IGenericResponse } from '../interfaces/user';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [visible, setVisible] = useState(false);

  const ask = async () => {
    if (!question.trim()) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: question }];
    setMessages(newMessages);
    setQuestion('');

    try {
      const res = await apiService.apiClient.post<IGenericResponse>('/chat', {
        question,
      });


      setMessages([
        ...newMessages,
        { role: 'assistant', content: res.data.message} as Message,
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: '❌ Error' } as Message,
      ]);
    }
  };

  return (
    <>
      <button
        className="toggle-chat-btn"
        style={{ color: 'whtie', backgroundColor: 'black' }}
        onClick={() => setVisible(!visible)}
      >
        {visible ? '✖ Close' : '💬 Ask'}
      </button>

      {visible && (
        <div className="chat-popup">
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask me anything..."
              onKeyDown={(e) => e.key === 'Enter' && ask()}
            />
            <button
              style={{ color: 'whtie', backgroundColor: 'black' }}
              onClick={ask}
            >
              send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
