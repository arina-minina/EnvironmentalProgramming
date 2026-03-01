import React from 'react';
import Sidebar from '../components/Sidebar';
import './Messages.css';

const Messages = () => {

  const messages = [
    { id: 1, sender: 'Иван Иванов', date: '12.10.2023' },
    { id: 2, sender: 'Мария Петрова', date: '11.10.2023' },
    { id: 3, sender: 'Алексей Смирнов', date: '10.10.2023' },
    { id: 4, sender: 'Екатерина К.', date: '09.10.2023' },
    { id: 5, sender: 'Дмитрий В.', date: '08.10.2023' },
  ];

  return (
    <div className="messages-page-container">
      <Sidebar />

      <main className="messages-main-content">

        <div className="messages-header">
          <h1 className="messages-title">Сообщения</h1>
          <button className="messages-write-btn">
            Написать
          </button>
        </div>

        <div className="messages-list">
          {messages.map((msg) => (
            <div key={msg.id} className="messages-item">
              <span className="messages-sender">{msg.sender}</span>
              <span className="messages-date">{msg.date}</span>
            </div>
          ))}
          {messages.length === 0 && (
            <p className="messages-empty">У вас пока нет сообщений</p>
          )}
        </div>

      </main>
    </div>
  );
};

export default Messages;
