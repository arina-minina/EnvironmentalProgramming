import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './VideoBlock.css';
import backIcon from '../assets/icons/back_arrow.svg';

const VideoBlock = () => {
  const navigate = useNavigate(); 

  return (
    <div className="video-block-container">
      <Sidebar />

      <main className="video-block-main-content">

        <div className="video-block-top-nav">
          <button className="video-block-back-btn" onClick={() => navigate(-1)}>
            <img src={backIcon} alt="Назад" className="video-block-back-icon" />
            <span>Назад</span>
          </button>
        </div>

        <h1 className="video-block-lesson-title">Название урока</h1>

        <div className="video-block-player-placeholder">
          <span className="video-block-player-text">Здесь будет видео</span>
        </div>

        <div className="video-block-actions-row">
          <button 
            className="video-block-action-btn" 
            onClick={() => navigate('/theory-block')}
          >
            Теория
          </button>
          
          <button className="video-block-action-btn">
            Практика
          </button>
        </div>

      </main>
    </div>
  );
};

export default VideoBlock;
