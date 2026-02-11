import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; // Импортируем твой готовый компонент
import './SignUpCourse.css';

const SignUpCourse = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Логика отправки формы
    alert("Заявка отправлена!");
  };

  return (
    <div className="signup-page-container">
      {/* Твой готовый сайдбар */}
      <Sidebar />

      {/* Основной контент с отступом слева */}
      <main className="signup-content">
        
        {/* Кнопка "Назад" */}
        <div className="top-nav">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <span className="arrow-icon">←</span> Назад
          </button>
        </div>

        {/* Центральный блок с формой */}
        <div className="center-wrapper">
          <h1 className="course-title">Запись на курс</h1>

          <div className="course-card">
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                placeholder="Имя" 
                className="custom-field"
              />
              
              <input 
                type="text" 
                placeholder="Номер телефона/эл. почта" 
                className="custom-field"
              />

              <div className="btn-container">
                <button type="submit" className="submit-course-btn">
                  Записаться
                </button>
              </div>
            </form>
          </div>
        </div>

      </main>
    </div>
  );
};

export default SignUpCourse;
