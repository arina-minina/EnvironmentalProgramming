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
      const response = await axios.post('http://127.0.0.1:8000/auth/register', {
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
    <div className="login-page" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className='content-box'>

        <h1 className='page-title'>Регистрация</h1>

        <form className='auth-card' onSubmit={handleRegister}>
          <input
            type='text'
            name='username'             
            value={formData.username}   
            onChange={handleChange}     
            placeholder='Логин'
            className='custom-input'
          />

          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Пароль'
            className='custom-input'
          />

          <input
            type='password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder='Повторите пароль'
            className='custom-input'
          />

          <button type='submit' className='login-btn'>Зарегистрироваться</button>
          
          <div className="card-footer">
            <Link to="/login" className="reg-link">Вход</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;