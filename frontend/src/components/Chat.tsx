import { useState } from 'react';
import axios from 'axios';
import './Chat.css';

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
      const res = await axios.post('http://localhost:5000/chat', {
        question,
        userId: 'demo-user',
      });

      setMessages([
        ...newMessages,
        { role: 'assistant', content: res.data } as Message,
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: '❌ שגיאה בשליחת השאלה' } as Message,
      ]);
    }
  };

  return (
    <>
      <button className="toggle-chat-btn" onClick={() => setVisible(!visible)}>
        {visible ? '✖ סגור' : '💬 שאל'}
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
              placeholder="שאל אותי משהו..."
              onKeyDown={(e) => e.key === 'Enter' && ask()}
            />
            <button onClick={ask}>שלח</button>
          </div>
        </div>
      )}
    </>
  );
}
