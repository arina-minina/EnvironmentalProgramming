import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import LoginPage2 from './pages/Register';
import HomePage from './pages/HomePage';
import CourseCard from './pages/CourseCard';
import SignUpCourse from './pages/SignUpCourse';
import MyCourses from './pages/MyCourses';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import VideoBlock from './pages/VideoBlock';
import TheoryBlock from './pages/TheoryBlock';
import PracticeBlock from './pages/PracticeBlock';
import Messages from './pages/Messages';
import MessageCard from './pages/MessageCard';
import WriteMessage from './pages/WriteMessage';
import AnswerMessage from './pages/AnswerMessage';
import AIHelper from './pages/AIHelper';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage2 />} />
        <Route path="course-card" element={<CourseCard />} />
        <Route path="sign-up-for-course" element={<SignUpCourse />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/video-block" element={<VideoBlock />} />
        <Route path="/theory-block" element={<TheoryBlock />} />
        <Route path="/practice-block" element={<PracticeBlock />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/message-card" element={<MessageCard />} />
        <Route path="/write-message" element={<WriteMessage />} />
        <Route path="/answer-message" element={<AnswerMessage />} />
        <Route path="/ai-helper" element={<AIHelper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
