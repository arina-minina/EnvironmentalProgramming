import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import backIcon from '../assets/icons/back_arrow.svg'; 
import './PracticeBlock.css';

const PracticeBlock = () => {
  const navigate = useNavigate();
  
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  const tasks = [
    {
      id: 101,
      task_type: 'short_answer', 
      title: 'Основы',
      description: 'Как называется функция для создания локального состояния в React?',
    },
    {
      id: 102,
      task_type: 'choices',
      title: 'Хуки',
      description: 'Выберите хуки, которые существуют в React:',
      options: ['useState', 'useTable', 'useEffect', 'useDiv'] 
    },
    {
      id: 103,
      task_type: 'long_answer',
      title: 'Компоненты',
      description: 'Напишите функцию, которая возвращает сумму двух чисел.',
      input_data: 'def sum(a, b): pass' 
    }
  ];

  const currentTask = tasks[currentTaskIndex];

  const handleAnswerChange = (value) => {
    setUserAnswers({ ...userAnswers, [currentTask.id]: value }); // копируем все старые ответы, обновляем текущий
  };

  const handleCheckboxChange = (option) => {
    const currentSelected = userAnswers[currentTask.id] || [];
    let newSelected;
    if (currentSelected.includes(option)) {
      newSelected = currentSelected.filter(item => item !== option);
    } else {
      newSelected = [...currentSelected, option];
    }
    handleAnswerChange(newSelected);
  };

  const renderTaskContent = () => {
    switch (currentTask.task_type) {
      case 'short_answer':
        return (
          <div className="practice-content-inner">
            <h3 className="practice-question-text">{currentTask.description}</h3>
            <input 
              type="text" 
              placeholder="Введите ваш ответ..." 
              className="practice-input-field"
              value={userAnswers[currentTask.id] || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
            />
            <button className="practice-submit-btn">Отправить ответ</button>
          </div>
        );

      case 'choices':
        return (
          <div className="practice-content-inner">
            <h3 className="practice-question-text">{currentTask.description}</h3>
            <div className="practice-options-list">
              {currentTask.options?.map((option, idx) => (
                <label key={idx} className="practice-checkbox-label">
                  <input 
                    type="checkbox" 
                    className="practice-checkbox" 
                    checked={(userAnswers[currentTask.id] || []).includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                  />
                  <span className="practice-checkbox-text">{option}</span>
                </label>
              ))}
            </div>
            <button className="practice-submit-btn">Проверить</button>
          </div>
        );

      case 'long_answer':
        return (
          <div className="practice-content-inner">
            <h3 className="practice-question-text">{currentTask.description}</h3>

            <div className="practice-code-placeholder">
              <span className="practice-placeholder-text">
                &lt; Редактор кода /&gt;
              </span>
              <span className="practice-placeholder-subtext">
                Здесь будет поле для написания кода
              </span>
            </div>

            <button className="practice-submit-btn">Проверить решение</button>
          </div>
        );

      default:
        return <div>Неизвестный тип задания</div>;
    }
  };

  return (
    <div className="practice-block-container">
      <Sidebar />
      <main className="practice-block-main-content">
        <div className="practice-block-top-nav">
          <button className="practice-nav-btn" onClick={() => navigate(-1)}>
            <img src={backIcon} alt="Назад" className="practice-icon" />
            <span>Назад</span>
          </button>
          <button className="practice-nav-btn" onClick={() => navigate('/theory-block')}>
            <span>Теория</span>
          </button>
        </div>

        <h1 className="practice-block-title">Практика: {currentTask.title}</h1>

        <div className="practice-task-indicators">
          {tasks.map((task, index) => (
            <button 
              key={task.id}
              className={`practice-indicator-circle ${index === currentTaskIndex ? 'active' : ''}`}
              onClick={() => setCurrentTaskIndex(index)}
            >
              №{index + 1}
            </button>
          ))}
        </div>

        <div className="practice-task-card">
          {renderTaskContent()}
        </div>
      </main>
    </div>
  );
};

export default PracticeBlock;
