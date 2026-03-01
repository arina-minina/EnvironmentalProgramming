import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import backIcon from '../assets/icons/back_arrow.svg';
import './MessageCard.css';

const MessageCard = () => {
  const navigate = useNavigate();

  const messageData = {
    id: 1,
    sender: 'Иван Иванов',
    subject: 'Домашнее задание №3',
    text: 'Здравствуй! Ошибка возникла из-за метода map в 17 строке.',
    date: '12.10.2023'
  };

  return (
    <div className="message-card-container">
      <Sidebar />

      <main className="message-card-main-content">

        <div className="message-card-header">
          <h1 className="message-card-title">Сообщение</h1>
          
          <button className="message-card-back-btn" onClick={() => navigate(-1)}>
            <img src={backIcon} alt="Назад" className="message-card-icon" />
            <span>Назад</span>
          </button>
        </div>

        <div className="message-card-wrapper">
          
          <div className="message-card-top-row">
            <div className="message-card-info">
              <p><strong>От кого:</strong> {messageData.sender}</p>
              <p><strong>Тема:</strong> {messageData.subject}</p>
            </div>
            
            <button className="message-card-reply-btn">
              Ответить
            </button>
          </div>

          <div className="message-card-text-box">
            {messageData.text}
          </div>

          <div className="message-card-footer">
            <span className="message-card-date">{messageData.date}</span>
          </div>

        </div>

      </main>
    </div>
  );
};

export default MessageCard;
