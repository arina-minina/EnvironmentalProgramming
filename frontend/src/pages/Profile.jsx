import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './Profile.css';
import editIcon from '../assets/icons/edit.svg'; 
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();

  // TODO получать эти данные при первой загрузке страницы (useEffect), через get запрос на .../profile
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const currentLogin = localStorage.getItem('username');
        if (!currentLogin) {
          navigate('/login');
          return;
        }
        const response = await axios.get('http://127.0.0.1:8000/profile', {
          params: { login: currentLogin }
        });
        // Сохраняем полученные данные в состояние
        setUserData(response.data);
      } catch (err) {
        console.error("Ошибка:", err);
        setError("Не удалось загрузить данные профиля.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleEditClick = () => {
    navigate('/edit-profile');
  };

  if (loading) {
    return <div className="profile-container" style={{padding: '40px'}}>Загрузка...</div>;
  }
  if (error) {
    return <div className="profile-container" style={{color: 'red', padding: '40px'}}>{error}</div>;
  }
  if (!userData) return null;

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
              <span className="field-value">{userData.phone_number}</span>
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
