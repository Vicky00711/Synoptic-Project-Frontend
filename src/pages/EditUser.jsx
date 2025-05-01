import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../components/Navigation';
import { getLocalEndpoint } from '../APICalls';

function EditUser() {
  const { id } = useParams(); // userId
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', role: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${getLocalEndpoint()}/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${getLocalEndpoint()}/api/users/${id}`, user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });
      Swal.fire('Success', 'User updated successfully', 'success').then(() => {
        navigate('/listUsers'); 
      });
    } catch (error) {
      console.error('Error updating user:', error);
      Swal.fire('Error', 'Failed to update user', 'error');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center mt-8">
        <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Edit User</h2>
          
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full mb-4 px-3 py-2 border rounded"
            required
          />
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full mb-4 px-3 py-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full mb-4 px-3 py-2 border rounded"
            required
          />
          <input
            type="text"
            name="role"
            value={user.role}
            onChange={handleChange}
            placeholder="Role (ADMIN / STUDENT / TEACHER)"
            className="w-full mb-6 px-3 py-2 border rounded"
            required
          />
          

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
