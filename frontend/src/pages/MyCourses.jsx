import React from 'react';
import Sidebar from '../components/Sidebar';
import searchIcon from '../assets/icons/search.svg'; 
import './HomePage.css';

const HomePage = () => {
  const courses = [
    { id: 1, title: 'Название курса', desc: '*краткое описание*' },
    { id: 2, title: 'Название курса', desc: '*краткое описание*' },
    { id: 3, title: 'Название курса', desc: '*краткое описание*' },
    { id: 4, title: 'Название курса', desc: '*краткое описание*' },
  ];

  return (
    <div className="home-container">
      <Sidebar />

      <main className="main-content">

        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <input 
              type="text" 
              placeholder="Поиск по курсам..." 
              className="search-input"
            />
            <button className="search-btn">
              <img src={searchIcon} alt="Поиск" />
            </button>
          </div>
        </div>

        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <h3 className="course-title">{course.title}</h3>
              <p className="course-desc">{course.desc}</p>
              <button className="more-btn">К выполнению</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
