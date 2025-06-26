'use client';

import type React from 'react';

import { useState, useEffect, useRef } from 'react';
import { AxiosInstence } from '../services/axios/AxiosInstance';
import type { IGenericResponse } from '../interfaces/user';
import './Chat.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export default function Chat() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [visible, setVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (visible && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: 'Hi I am Adam your AI agent, how can I assist you today?',
          timestamp: new Date(),
        },
      ]);
    }
  }, [visible]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const ask = async () => {
    if (!question.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      {
        role: 'user',
        content: question,
        timestamp: new Date(),
      },
    ];
    setMessages(newMessages);
    setQuestion('');
    setIsTyping(true);

    try {
      const res = await AxiosInstence.post<IGenericResponse>('/chat', {
        question,
      });

      setTimeout(() => {
        setMessages([
          ...newMessages,
          {
            role: 'assistant',
            content: res.data.message,
            timestamp: new Date(),
          } as Message,
        ]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        setMessages([
          ...newMessages,
          {
            role: 'assistant',
            content: '❌ Sorry, I encountered an error. Please try again.',
            timestamp: new Date(),
          } as Message,
        ]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      ask();
    }
  };

  return (
    <>
      {/* Futuristic Chat Button */}
      <button
        className={`futuristic-chat-btn ${visible ? 'active' : ''}`}
        onClick={() => setVisible(!visible)}
      >
        <div className="btn-content">
          <div className="bot-avatar">
            <div className="bot-face">
              <div className="bot-eyes">
                <div className="eye"></div>
                <div className="eye"></div>
              </div>
              <div className="bot-mouth"></div>
            </div>
          </div>
          <span className="btn-text">
            {visible ? 'Close Adam' : 'Chat with Adam'}
          </span>
        </div>
        <div className="btn-glow"></div>
      </button>

      {/* Chat Interface */}
      {visible && (
        <div className="futuristic-chat-popup">
          <div className="chat-header">
            <div className="header-content">
              <div className={`adam-avatar ${visible ? 'smiling' : ''}`}>
                <div className="avatar-glow"></div>
                <div className="avatar-face">
                  <div className="avatar-eyes">
                    <div className="eye active"></div>
                    <div className="eye active"></div>
                  </div>
                  <div
                    className={`avatar-mouth ${visible ? 'smiling' : 'active'}`}
                  ></div>
                </div>
              </div>
              <div className="header-info">
                <h3>Adam AI</h3>
                <span className="status">Online & Ready</span>
              </div>
            </div>
            <button className="close-btn" onClick={() => setVisible(false)}>
              ✕
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message-container ${msg.role}`}>
                <div className={`message ${msg.role}`}>
                  <div className="message-content">{msg.content}</div>
                  <div className="message-time">
                    {msg.timestamp?.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message-container assistant">
                <div className="message assistant typing">
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <div className="input-wrapper">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your message to Adam..."
                onKeyDown={handleKeyPress}
                className="futuristic-input"
              />
              <button
                onClick={ask}
                disabled={!question.trim() || isTyping}
                className="send-btn"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
