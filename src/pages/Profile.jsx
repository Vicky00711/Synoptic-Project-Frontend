import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Navbar from '../components/NavigationStudent';

function Profile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/students/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        });
        setProfile(response.data);
        console.log('Profile data:', response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to load profile. Please log in again.',
          icon: 'error',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/'); 
        });
      }
    };

    fetchProfile();
  },[]);
if (!profile) {
  return <div>Loading...</div>;
}
 

  return (
    <div>
      <Navbar />
      <div className="bg-white overflow-hidden shadow rounded-lg border max-w-2xl mx-auto mt-10 p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
          Student Profile
        </h3>
        <dl className="space-y-6">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Full Name</dt>
            <dd className="text-sm text-gray-900">{profile.firstName} {profile.lastName}</dd>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Email Address</dt>
            <dd className="text-sm text-gray-900">{profile.email}</dd>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
            <dd className="text-sm text-gray-900">{profile.parentContact}</dd>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Enrollment Date</dt>
            <dd className="text-sm text-gray-900">{profile.enrollmentDate}</dd>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Class Name</dt>
            <dd className="text-sm text-gray-900">{profile.gradeLevelName}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default Profile;
