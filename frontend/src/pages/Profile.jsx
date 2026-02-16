import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './Profile.css';
import editIcon from '../assets/icons/edit.svg'; 

const Profile = () => {
  const navigate = useNavigate();

  // TODO получать эти данные при первой загрузке страницы (useEffect), через get запрос на /profile/
  const userData = {
    login: "eco_user_2024",
    password: "••••••••",
    name: "Анна Тест",
    phone: "+7 (999) 000-00-00",
    email: "example@eco.com"
  };

  const handleEditClick = () => {
    navigate('/edit-profile');
  };

  return (
    <div className="profile-container">
      <Sidebar />

      <main className="profile-content">
        <div className="profile-header">
          <h1 className="profile-title">Мой профиль</h1>
          
          <button className="edit-btn" onClick={handleEditClick} aria-label="Редактировать">
            <img src={editIcon} alt="Редактировать" className="edit-icon" />
          </button>
        </div>

        <section className="profile-section">
          <h2 className="section-title">Данные аккаунта:</h2>
          <div className="fields-group">
            <div className="info-field">
              <span className="field-label">Логин:</span>
              <span className="field-value">{userData.login}</span>
            </div>
            <div className="info-field">
              <span className="field-label">Пароль:</span>
              <span className="field-value">{userData.password}</span>
            </div>
          </div>
        </section>

        <section className="profile-section">
          <h2 className="section-title">Данные пользователя:</h2>
          <div className="fields-group">
            <div className="info-field">
              <span className="field-label">Имя:</span>
              <span className="field-value">{userData.name}</span>
            </div>
            <div className="info-field">
              <span className="field-label">Номер телефона:</span>
              <span className="field-value">{userData.phone}</span>
            </div>
            <div className="info-field">
              <span className="field-label">Эл. почта:</span>
              <span className="field-value">{userData.email}</span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Profile;
