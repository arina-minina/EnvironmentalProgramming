import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './EditProfile.css';
import editIcon from '../assets/icons/edit.svg';

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    login: "eco_user_2024",
    password: "password123",
    name: "Анна Тест",
    phone: "+7 (999) 000-00-00",
    email: "example@eco.com"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    // TODO логика сохранения (1 - Сделать Put/Post запрос на сервер, Если успешно, то 2 - Поменять значения локально. useState)
    alert("Изменения сохранены!");
    navigate('/profile');
  };

  const handleCancel = () => {
    navigate('/profile'); 
  };

  return (
    <div className="profile-container">
      <Sidebar />

      <main className="profile-content">
        <div className="profile-header">
          <h1 className="profile-title">Мой профиль</h1>
          
          <div className="header-actions">
            <button className="save-btn" onClick={handleSave}>
              Сохранить изменения
            </button>
            
            <button className="edit-btn" onClick={handleCancel} title="Выйти из редактирования">
              <img src={editIcon} alt="Редактировать" className="edit-icon" />
            </button>
          </div>
        </div>

        <section className="profile-section">
          <h2 className="section-title">Данные аккаунта:</h2>
          <div className="fields-group">
            <div className="editable-field">
              <label className="field-label">Логин:</label>
              <input 
                type="text" 
                name="login"
                value={formData.login} 
                onChange={handleChange}
                className="custom-input"
              />
            </div>

            <div className="editable-field">
              <label className="field-label">Пароль:</label>
              <input 
                type="password" 
                name="password"
                value={formData.password} 
                onChange={handleChange}
                className="custom-input"
              />
            </div>
          </div>
        </section>

        <section className="profile-section">
          <h2 className="section-title">Данные пользователя:</h2>
          <div className="fields-group">
            <div className="editable-field">
              <label className="field-label">Имя:</label>
              <input 
                type="text" 
                name="name"
                value={formData.name} 
                onChange={handleChange}
                className="custom-input"
              />
            </div>

            <div className="editable-field">
              <label className="field-label">Номер телефона:</label>
              <input 
                type="text" 
                name="phone"
                value={formData.phone} 
                onChange={handleChange}
                className="custom-input"
              />
            </div>

            <div className="editable-field">
              <label className="field-label">Эл. почта:</label>
              <input 
                type="email" 
                name="email"
                value={formData.email} 
                onChange={handleChange}
                className="custom-input"
              />
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default EditProfile;
