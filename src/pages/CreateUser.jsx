import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../components/Navigation';

function CreateUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !role || !password || !cpassword) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all fields.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
    Swal.fire({
      title: 'Error!',
      text: 'Please enter a valid email address.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
    return;
  }

  if (password.length < 6) {
    Swal.fire({
      title: 'Error!',
      text: 'Password must be at least 6 characters long.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
    return;
  }

    if (password !== cpassword) {
      Swal.fire({
        title: 'Error!',
        text: 'Passwords do not match.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/users', {
        firstName,
        lastName,
        email,
        role,
        password,
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        }});

      if (response.status === 201) {
        Swal.fire({
          title: 'Success!',
          text: 'User registered successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        navigate('/listUsers');
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div>
        <Navbar />
    <div className="max-w-4xl max-sm:max-w-lg mx-auto p-6 mt-6">
      <div className="text-center mb-12 sm:mb-16">
        <h4 className="text-slate-600 text-base mt-6 h-4">Register Users</h4>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <label className="text-slate-800 text-sm font-medium mb-2 block">First Name</label>
            <input
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter first name"
              required
            />
          </div>

          <div>
            <label className="text-slate-800 text-sm font-medium mb-2 block">Last Name</label>
            <input
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter last name"
              required
            />
          </div>

          <div>
            <label className="text-slate-800 text-sm font-medium mb-2 block">Email</label>
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="text-slate-800 text-sm font-medium mb-2 block">Role</label>
            <input
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              type="text"
              className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              placeholder="ADMIN/STUDENT/TEACHER"
              required
            />
          </div>

          <div>
            <label className="text-slate-800 text-sm font-medium mb-2 block">Password</label>
            <input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter password"
              required
            />
          </div>

          <div>
            <label className="text-slate-800 text-sm font-medium mb-2 block">Confirm Password</label>
            <input
              name="cpassword"
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
              type="password"
              className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Confirm password"
              required
            />
          </div>
        </div>

        <div className="mt-12">
          <button
            type="submit"
            className="mx-auto block py-3 px-6 text-sm font-medium tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Register
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default CreateUser;
