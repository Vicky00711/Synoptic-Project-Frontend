import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './pages/AdminDashboard';
import Home from './pages/Home';
import RegistrationForm from './pages/RegistrationForm';
import ListUsers from './pages/ListUsers';
import CreateStudent from './pages/CreateStudent';
import CreateUser from './pages/CreateUser';
import CreateClass from './pages/AddClasses';
import ListClasses from './pages/ListClasses';
import AddTimeTable from './pages/AddTimeTable';
import AddCourseMaterials from './pages/AddCourseMaterials';
import ListStudents from './pages/ListStudents';
import StudentDashBoard from './pages/StudentDashBoard';
import Profile from './pages/Profile';
import CourseMaterials from './pages/CourseMaterials';


function App() {
 

  return (
    <div>
      <Router>
        
        <Routes>
          <Route path='/adminDashboard' element={<Admin />} />
          <Route path='/' element={<Home />} />
          <Route path='/registeration' element={<RegistrationForm />} />
          <Route path='/listUsers' element={<ListUsers />} />
          <Route path='/createStudent/:userId' element={<CreateStudent />} />
          <Route path='/createUser' element={<CreateUser />} />
          <Route path='/class' element={<CreateClass />} />
          <Route path='/listClass' element={<ListClasses />} />
          <Route path='/upload-timetable/:gradeId' element={<AddTimeTable />} />
          <Route path="/upload-course/:gradeId" element={<AddCourseMaterials />} />
          <Route path="/grade/:gradeId/students" element={<ListStudents />} />       
          <Route path="/stduentDashboard" element={<StudentDashBoard />} />       
          <Route path="/profile" element={<Profile />} />       
          <Route path="/courseMaterials" element={<CourseMaterials />} />       
        </Routes>
      </Router>
    </div>
  );
}

export default App;
