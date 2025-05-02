import React from 'react';
import studentImage from '../assets/graduated.png';
import teacher from '../assets/teacher.png';
import Navbar from '../components/Navigation';
import Class from '../assets/class.png';
import Newspaper from '../assets/newspaper.png';
import User from '../assets/user.png';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

    const navigate = useNavigate();
    const navigate2 = useNavigate();
    const navigate3 = useNavigate();
    const navigatePage = () => {
       
        navigate('/listUsers');
    }  

    const navigatePage2 = () => {
        navigate2('/listClass');
    }
  return (
    <div>
        <Navbar />
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
                LIST OF USERS
              </h2>
              <p className="leading-relaxed text-sm px-2">
                 UPDATE, DELETE
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
                  src={studentImage}
                />
              </div>
              <h2 className="title-font text-xl font-semibold text-gray-900 mt-5 mb-2">
                STUDENTS
              </h2>
              <p className="leading-relaxed text-sm px-2">
                 UPDATE, DELETE
              </p>
              <button className="flex mx-auto mt-4 text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm">
                Future Update
              </button>
            </div>

            <div className="w-full sm:w-5/12 md:w-1/3 lg:w-1/4 mb-10">
              <div className="rounded-lg h-48 overflow-hidden shadow-md">
                <img
                  alt="teacher image"
                  className="h-full w-auto object-cover object-center"
                  src={teacher}
                />
              </div>
              <h2 className="title-font text-xl font-semibold text-gray-900 mt-5 mb-2">
                TEACHERS
              </h2>
              <p className="leading-relaxed text-sm px-2">
                UPDATE, DELETE
              </p>
              <button className="flex mx-auto mt-4 text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm">
                Future Update
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font my-[-100px]">
        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-wrap justify-center text-center gap-8">
            <div className="w-full sm:w-5/12 md:w-1/3 lg:w-1/4 mb-10">
              <div className="rounded-lg h-48 overflow-hidden shadow-md">
                <img
                  alt="content"
                  className="object-cover object-center h-full w-full"
                  src={Class}
                />
              </div>
              <h2 className="title-font text-xl font-semibold text-gray-900 mt-5 mb-2">
                CLASSES
              </h2>
              <p className="leading-relaxed text-sm px-2">
                LIST OF CLASSES
              </p>
              <button onClick={navigatePage2} className="flex mx-auto mt-4 text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm">
                NEXT
              </button>
            </div>

            <div className="w-full sm:w-5/12 md:w-1/3 lg:w-1/4 mb-10">
              <div className="rounded-lg h-48 overflow-hidden shadow-md">
                <img
                  alt="content"
                  className="object-cover object-center h-30 w-full"
                  src={Newspaper}
                />
              </div>
              <h2 className="title-font text-xl font-semibold text-gray-900 mt-5 mb-2">
                NEWS
              </h2>
              <p className="leading-relaxed text-sm px-2">
                SCHOOL NEWS
              </p>
              <button className="flex mx-auto mt-4 text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm">
                Future Update
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard; 