import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../components/Navigation';
import { Link } from 'react-router-dom';
import { getLocalEndpoint } from '../APICalls';

function CreateStudent() {
  const { userId } = useParams();
  const [usersId] = useState(userId);
  const [parentContact, setParentContact] = useState('');
  const [enrollmentDate, setEnrollmentDate] = useState('');
  const [id, setId] = useState(''); // gradeId
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!localStorage.getItem('authToken')) {
      Swal.fire({
        title: 'Error!',
        text: 'You are not logged in',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      navigate('/');
      return;
    }

    if (!parentContact || !enrollmentDate || !id) {
      setError('Please fill in all fields.');
      return;
    }

    if (parentContact.length < 10) {
      setError('Parent contact number must be at least 10 digits long');
      return;
    }

    try {
      const response = await axios.post(
        `${getLocalEndpoint()}/api/students`,
        {
          users: { usersId: Number(usersId) },
          enrollmentDate,
          parentContact: Number(parentContact),
          gradeLevel: { id: Number(id) },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        Swal.fire({
          title: 'Success!',
          text: 'Student successfully registered',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        navigate('/listUsers');
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Error!',
        text: 'Student with this ID might already exist or something went wrong.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://www.svgrepo.com/show/301692/login.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register a new student
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <form onSubmit={handleSubmit} className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div>
              <label className="block text-sm font-medium text-gray-700">User Id</label>
              <input
                type="text"
                value={userId}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">Parent Contact</label>
              <input
                type="tel"
                placeholder="Parent's mobile no."
                required
                value={parentContact}
                onChange={(e) => setParentContact(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">Enrollment Date</label>
              <input
                type="date"
                required
                value={enrollmentDate}
                onChange={(e) => setEnrollmentDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">Grade ID</label>
              <input
                type="number"
                placeholder="Enter Grade ID"
                required
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
              />
            </div>

            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-500 text-sm font-medium"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateStudent;
