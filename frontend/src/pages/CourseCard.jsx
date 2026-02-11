import React from 'react';
import Sidebar from '../components/Sidebar';
import './CourseCard.css';
import backIcon from '../assets/icons/back_arrow.svg';

const CourseCard = () => {
  const reviews = [
    { id: 1, name: 'Имя', text: 'текст отзыва', date: 'дата написания', rating: 'оц' },
    { id: 2, name: 'Имя', text: 'текст отзыва', date: 'дата написания', rating: 'оц' },
    { id: 3, name: 'Имя', text: 'текст отзыва', date: 'дата написания', rating: 'оц' },
    { id: 4, name: 'Имя', text: 'текст отзыва', date: 'дата написания', rating: 'оц' },
  ];

  return (
    <div className="course-page-wrapper">
      <Sidebar />

      <main className="course-content">
        <header className="course-header">
          <button className="btn-back">
            <img src={backIcon} alt="Назад" className="btn-icon" />
            <span>Назад</span>
          </button>
          <button className="btn-start">Начать обучение</button>
        </header>

        <div className="course-grid">
          <section className="course-left-column">
            <h1 className="page-title">Название курса</h1>
            <div className="description-box">
              <p>Подробное описание курса...</p>
            </div>
          </section>

          <aside className="course-right-column">
            <h2 className="section-title">Отзывы</h2>
            <div className="reviews-border-box">
              <div className="reviews-list">
                {reviews.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <span className="review-author">{review.name}</span>
                      <div className="rating-badge">{review.rating}</div>
                    </div>
                    <div className="review-bubble">
                      <p className="review-text">{review.text}</p>
                      <span className="review-date">{review.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
};

export default CourseCard;