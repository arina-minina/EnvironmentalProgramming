import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import bgImage from '../assets/Desktop.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }

    try {
      const response = await axios.post('/auth/register', {
        username: formData.username,
        password: formData.password
      });

      console.log(response.data);
      alert("Регистрация прошла успешно! Теперь войдите.");
      navigate('/login');

    } catch (error) {
      if (error.response) {
        alert(error.response.data.detail);
      } else {
        alert("Ошибка соединения с сервером");
      }
    }
  };

  return (
    <div className="reg-wrapper" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className='reg-content'>

        <h1 className='reg-title'>Регистрация</h1>

        <form className='reg-card' onSubmit={handleRegister}>
          <input
            type='text'
            name='username'             
            value={formData.username}   
            onChange={handleChange}     
            placeholder='Логин'
            className='reg-input'
          />

          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Пароль'
            className='reg-input'
          />

          <input
            type='password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder='Повторите пароль'
            className='reg-input'
          />

          <button type='submit' className='reg-submit-btn'>Зарегистрироваться</button>
          
          <div className="reg-footer">
            <Link to="/login" className="reg-link">Вход</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
