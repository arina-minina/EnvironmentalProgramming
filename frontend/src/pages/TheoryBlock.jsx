import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import backIcon from '../assets/icons/back_arrow.svg'; 
import './TheoryBlock.css';

const TheoryBlock = () => {
  const navigate = useNavigate();

  return (
    <div className="theory-block-container">
      <Sidebar />

      <main className="theory-block-main-content">
        
        <div className="theory-block-top-nav">
          <button className="theory-block-nav-btn" onClick={() => navigate(-1)}>
            <img src={backIcon} alt="Назад" className="theory-block-icon" />
            <span>Назад</span>
          </button>

          <button className="theory-block-nav-btn" onClick={() => navigate('/practice-block')}>
            <span>К практике</span>
          </button>
        </div>

        <h1 className="theory-block-title">Название урока</h1>

        <div className="theory-block-content-paper">
          <div className="theory-block-text-content">
            <h2>Введение</h2>
            <p>
              Здесь будет располагаться теоретический материал. 
              Этот блок имитирует лист бумаги или документ.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
};

export default TheoryBlock;
