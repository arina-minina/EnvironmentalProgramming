import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LoginPage2 from './pages/LoginPage2'
import HomePage from './pages/HomePage'
import CourseCard from './pages/CourseCard'
import SignUpCourse from './pages/SignUpCourse';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<LoginPage />} />
        <Route path="/register2" element={<LoginPage2 />} />
        <Route path="course-card" element={<CourseCard />} />
        <Route path="sign-up-for-course" element={<SignUpCourse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;