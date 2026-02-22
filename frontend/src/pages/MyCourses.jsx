import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Sidebar from '../components/Sidebar';
import searchIcon from '../assets/icons/search.svg'; 
import './HomePage.css';

const HomePage = () => {
  const [Ucourses, setUcourses] = useState([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUcourses = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem('id');
        if (!userId) {
          console.warn("User ID not found in localStorage");
          setLoading(false);
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/user-courses', {params: {user_id: userId}});

        setUcourses(response.data);
      } catch (err) {
        console.error("Ошибка при загрузке курсов:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUcourses();
  }, []);

if (loading) {
    return <div className="profile-container" style={{padding: '40px'}}>Загрузка...</div>;
  }
if (!Ucourses) return null;

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
          
          {
          Ucourses.map((course) => (
             <div key={course.id} className="homepage-course-card">
               <h3 className="homepage-course-title">{course.title}</h3>
               <p className="homepage-course-desc">{course.short_description}</p>
               <button className="homepage-more-btn">К выполнению</button>
             </div>
          ))
          }
        </div>
      </main>
    </div>
  );
};

export default HomePage;
