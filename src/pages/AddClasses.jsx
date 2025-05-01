import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../components/Navigation';
import { getLocalEndpoint } from '../APICalls';

function AddClasses() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name) {
      Swal.fire('Error', 'Please enter the class name.', 'error');
      return;
    }

    const requestBody = {
      name: name,
      students: null, 
    };

    try {
      const response = await axios.post(
        `${getLocalEndpoint()}/api/admin/grade-level`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        Swal.fire('Success!', 'Class created successfully.', 'success');
        navigate('/adminDashboard');
      }
    } catch (error) {
      console.error('Error creating class:', error);
      Swal.fire('Error', 'Failed to create class.', 'error');
    }
  };

  return (
    <div>
      <Navbar />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-gray-900">
              Add a New Class
            </h1>
            <p className="leading-relaxed mt-4">
              Create a new grade/class by providing a name. You can assign students later.
            </p>
          </div>
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Create Class</h2>
            <div className="relative mb-4">
              <label htmlFor="className" className="leading-7 text-sm text-gray-600">
                Class Name
              </label>
              <input
                type="text"
                id="className"
                placeholder="Type in class name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Create Class
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddClasses;
