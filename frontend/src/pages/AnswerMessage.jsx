import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import backIcon from '../assets/icons/back_arrow.svg';
import './MessageForm.css';

const AnswerMessage = () => {
  const navigate = useNavigate();

  const replyData = {
    to: 'Иван Иванов',
    subject: 'Re: Вопрос по заданию'
  };

  const handleSend = () => {
    console.log("Ответ отправлен");
    navigate(-1);
  };

  return (
    <div className="message-form-container">
      <Sidebar />

      <main className="message-form-main-content">
        
        <div className="message-form-header">
          <h1 className="message-form-title">Написать сообщение</h1>
          
          <button className="message-form-back-btn" onClick={() => navigate(-1)}>
            <img src={backIcon} alt="Назад" className="message-form-icon" />
            <span>Назад</span>
          </button>
        </div>

        <div className="message-form-card">
          
          <div className="message-form-top-row">
            
            <div className="message-form-inputs-group">
              
              <div className="message-form-field-row">
                <span className="message-form-label">Кому:</span>
                <span className="message-form-text-value">{replyData.to}</span>
              </div>

              <div className="message-form-field-row">
                <span className="message-form-label">Тема:</span>
                <span className="message-form-text-value">{replyData.subject}</span>
              </div>

            </div>

            <button className="message-form-send-btn" onClick={handleSend}>
              Отправить
            </button>
          </div>

          <textarea 
            className="message-form-textarea" 
            placeholder="*Текст сообщения"
          ></textarea>

        </div>

      </main>
    </div>
  );
};

export default AnswerMessage;
