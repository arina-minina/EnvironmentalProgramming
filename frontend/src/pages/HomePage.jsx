import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import searchIcon from '../assets/icons/search.svg'; 
import './HomePage.css';

const HomePage = () => {
  const [courses, setCourses] = useState([])
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/courses');
        setCourses(response.data);
      } catch (err) {
        console.error("Ошибка при загрузке курсов:", err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="homepage-container">
      <Sidebar />

      <main className="homepage-main-content">

        <div className="homepage-search-bar-container">
          <div className="homepage-search-input-wrapper">
            <input 
              type="text" 
              placeholder="Поиск по курсам..." 
              className="homepage-search-input"
            />
            <button className="homepage-search-btn">
              <img src={searchIcon} alt="Поиск" />
            </button>
          </div>
        </div>

        <div className="homepage-courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="homepage-course-card">
              <h3 className="homepage-course-title">{course.title}</h3>
              <p className="homepage-course-desc">{course.short_description}</p>
              <button className="homepage-more-btn">Подробнее</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
