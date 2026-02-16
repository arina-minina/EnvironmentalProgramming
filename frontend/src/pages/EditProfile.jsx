import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './EditProfile.css';
import editIcon from '../assets/icons/edit.svg';
import axios from 'axios';

const EditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    user_id: null,
    login: "",
    password: "",
    name: "",
    phone_number: "",
    email: ""
  });

  useEffect(() => {
    const loadUserData = async () => {
      const currentLogin = localStorage.getItem('username');
      if (!currentLogin) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/profile', {
          params: { login: currentLogin }
        });
        setFormData({
          user_id: response.data.id,
          login: response.data.login,
          name: response.data.name,
          email: response.data.email,
          phone_number: response.data.phone_number,
          password: response.data.password
        });
      } catch (err) {
        console.error("Ошибка загрузки:", err);
        alert("Не удалось загрузить данные пользователя");
        navigate('/profile');
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        user_id: formData.user_id,
        login: formData.login,
        name: formData.name,
        email: formData.email || null,
        phone_number: formData.phone_number || null,
        password: formData.password || null 
      };

      await axios.put('http://127.0.0.1:8000/edit-profile', payload);

      if (formData.login !== localStorage.getItem('username')) {
        localStorage.setItem('username', formData.login);
      }

      alert("Изменения успешно сохранены!");
      navigate('/profile');

    } catch (err) {
      console.error("Ошибка сохранения:", err);
      if (err.response && err.response.data) {
        alert(`Ошибка: ${err.response.data.detail}`);
      } else {
        alert("Не удалось сохранить изменения.");
      }
    } finally {
        setLoading(false);
      }
  };

  const handleCancel = () => {
    navigate('/profile'); 
  };

  if (loading) {
    return <div className="profile-container" style={{padding: '50px'}}>Загрузка данных...</div>;
  }

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
                name="phone_number"
                value={formData.phone_number} 
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
