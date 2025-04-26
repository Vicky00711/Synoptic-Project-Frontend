import React from 'react';
import studentImage from '../assets/graduated.png';
import teacher from '../assets/teacher.png';
import NavigationStudent from '../components/NavigationStudent';
import CourseMaterial from '../assets/school-material.png';

import User from '../assets/user.png';
import { useNavigate } from 'react-router-dom';

const StudentDashBoard = () => {

    const navigate = useNavigate();
    const navigate2 = useNavigate();
    const navigate3 = useNavigate();
    const navigatePage = () => {
       
        navigate('/profile');
    }  

    const navigatePage2 = () => {
        navigate2('/courseMaterials');
    }
  return (
    <div>
        <NavigationStudent />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-wrap justify-center text-center gap-8">
          <div className="w-full sm:w-5/12 md:w-1/3 lg:w-1/4 mb-10">
              <div className="rounded-lg h-48 overflow-hidden shadow-md">
                <img
                  alt="student image"
                  className="h-full w-auto object-cover object-center"
                  src={User}
                />
              </div>
              <h2 className="title-font text-xl font-semibold text-gray-900 mt-5 mb-2">
               User Profile
              </h2>
              <p className="leading-relaxed text-sm px-2">
                 
              </p>
              <button onClick={navigatePage} className="flex mx-auto mt-4 text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm">
                NEXT
              </button>
            </div>
            <div className="w-full sm:w-5/12 md:w-1/3 lg:w-1/4 mb-10">
              <div className="rounded-lg h-48 overflow-hidden shadow-md">
                <img
                  alt="student image"
                  className="h-full w-auto object-cover object-center"
                  src={CourseMaterial}
                />
              </div>
              <h2 className="title-font text-xl font-semibold text-gray-900 mt-5 mb-2">
                Course Materials
              </h2>
              <p className="leading-relaxed text-sm px-2">
                 
              </p>
              <button onClick={navigatePage2} className="flex mx-auto mt-4 text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm">
                NEXT
              </button>
            </div>

            
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentDashBoard; 