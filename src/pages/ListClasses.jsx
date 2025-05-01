import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navigation';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { getLocalEndpoint } from '../APICalls';

function ListClasses() {

const navigate = useNavigate();


  const [classes, setClasses] = useState([]);

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${getLocalEndpoint()}/api/admin/grade-levels`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load classes.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleDelete = async (gradeId) => {
    try {
      const response = await axios.delete(`${getLocalEndpoint()}/api/admin/grade-level/${gradeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Grade level has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        fetchClasses(); // Refresh list
      }
    } catch (error) {
      console.error('Error deleting class:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Could not delete this grade level.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div>
      <Navbar />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Class List</h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Manage grade levels in the system.</p>
          </div>
          <div className="flex flex-wrap -m-4">
            {classes.map((cls) => (
              <div key={cls.id} className="xl:w-1/3 md:w-1/2 p-4">
                <div className="border border-gray-200 p-6 rounded-lg flex flex-col justify-between h-full">
                  <div>
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                           className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-2">{cls.name}</h2>
                    <p className="leading-relaxed text-base mb-4">Grade ID: {cls.id}</p>
                  </div>
                  <div className="space-y-2">
                    <button
                    className="w-full text-sm bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    onClick={() => navigate(`/upload-timetable/${cls.id}`)}
                >
                    Add Timetable
                    </button>

                    <button
                      className="w-full text-sm bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                      onClick={() => navigate(`/upload-course/${cls.id}`)}
                    >
                      Add Course Materials
                    </button>

                    <button
                      className="w-full text-sm bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                      onClick={() => navigate(`/grade/${cls.id}/students`)}
                    >
                     List of Students
                    </button>
                    <button
                      className="w-full text-sm bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                      onClick={() => handleDelete(cls.id)}
                    >
                      Delete Class
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {classes.length === 0 && (
              <div className="text-center w-full text-gray-500">No classes found.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ListClasses;
