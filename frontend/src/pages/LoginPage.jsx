import React from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';
const LoginPage = () => {
  return (
    <div className="login-page">

      <div className='content-box'>

        <h1 className='page-title'>Авторизация</h1>

        <form className='auth-card'>
          <input
          type='text'
          placeholder='Логин'
          className='custom-input'/>
          <input
          type='password'
          placeholder='Пароль'
          className='custom-input'/>

          <button type='submit' className='login-btn'>Войти</button>

          <div className="card-footer">
            <Link to="/register2" className="reg-link">Регистрация</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
