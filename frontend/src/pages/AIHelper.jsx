import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import './AIHelper.css';

const AIHelper = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Привет! Я твой AI помощник. Чем могу помочь по курсу?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  
  // автоскролл
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // отправка запроса
  const handleSend = (e) => {
    if ((e.key === 'Enter' || e.type === 'click') && inputValue.trim()) {
      const newUserMsg = { id: Date.now(), sender: 'user', text: inputValue };
      
      setMessages((prev) => [...prev, newUserMsg]);
      setInputValue('');

      // заглушка ответа ИИ
      setTimeout(() => {
        const newAiMsg = { 
          id: Date.now() + 1, 
          sender: 'ai', 
          text: 'Это заглушка ответа. Здесь будет ответ от нейросети.' 
        };
        setMessages((prev) => [...prev, newAiMsg]);
      }, 1000);
    }
  };

  const handleReset = () => {
    setMessages([]);
  };

  return (
    <div className="ai-helper-container">
      <Sidebar />

      <main className="ai-helper-main-content">
        <div className="ai-helper-header">
          <h1 className="ai-helper-title">AI помощник</h1>
          <button className="ai-helper-reset-btn" onClick={handleReset}>
            Начать заново
          </button>
        </div>
        <div className="ai-helper-chat-box">
          
          <div className="ai-helper-messages-area">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`ai-helper-message-bubble ${msg.sender === 'user' ? 'user' : 'ai'}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="ai-helper-input-wrapper">
          <input
            type="text"
            className="ai-helper-input"
            placeholder="Спросите..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleSend}/>
        </div>
      </main>
    </div>
  );
};

export default AIHelper;
