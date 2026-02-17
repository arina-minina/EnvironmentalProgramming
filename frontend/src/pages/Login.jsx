import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/auth/login', {
        username: username,
        password: password
      });

      if (response.data.status === "success") {
        localStorage.setItem('username', username);
        navigate('/profile');
      }

    } catch (error) {
      if (error.response) {
        alert(error.response.data.detail);
      } else {
        alert("Ошибка соединения с сервером");
      }
    }
  };

  return (
    <div className="login-wrapper">

      <div className='login-content'>

        <h1 className='login-title'>Авторизация</h1>
      
        <form className='login-card' onSubmit={handleLogin}>
          <input
            type='text'
            placeholder='Логин'
            className='login-input'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='password'
            placeholder='Пароль'
            className='login-input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type='submit' className='login-submit-btn'>Войти</button>

          <div className="login-footer">
            <Link to="/register" className="login-link">Регистрация</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
