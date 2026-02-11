import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import profileIcon from '../assets/icons/profile.svg';
import homeIcon from '../assets/icons/home.svg';
import coursesIcon from '../assets/icons/courses.svg';
import messageIcon from '../assets/icons/message.svg';
import botIcon from '../assets/icons/bot.svg';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <Link to="/profile" className="icon-btn">
          <img src={profileIcon} alt="Профиль" />
        </Link>
      </div>

      <div className="sidebar-center">
        <Link to="/" className="icon-btn">
           <img src={homeIcon} alt="Главная" />
        </Link>
        
        <Link to="/courses" className="icon-btn">
          <img src={coursesIcon} alt="Мои курсы" />
        </Link>
        
        <div className="icon-btn">
          <img src={messageIcon} alt="Сообщения" />
        </div>
      </div>

      <div className="sidebar-bottom">
         <div className="icon-btn">
          <img src={botIcon} alt="Помощь" />
         </div>
      </div>
    </aside>
  );
};

export default Sidebar;