import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './SignUpCourse.css';
import backIcon from '../assets/icons/back_arrow.svg';

const SignUpCourse = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Заявка отправлена!");
  };

  return (
    <div className="signup-page-container">
      <Sidebar />

      <main className="signup-content">
        
        <div className="top-nav">
          <button className="btn-back" onClick={() => navigate(-1)}>
                      <img src={backIcon} alt="Назад" className="btn-icon" />
                      <span>Назад</span>
                    </button>
        </div>

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
