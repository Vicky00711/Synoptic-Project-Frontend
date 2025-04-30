import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function Home() {

    const [email, setEmail] = useState('');
    const [password, setPassoword] = useState('');
    const[error, setError]= useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://Administrationsystem-env.eba-mm829pa2.eu-north-1.elasticbeanstalk.com/api/auth/login', {
                email,
                password
            });
            console.log(response.data);
            if (response.status === 200 && response.data.role === "ADMIN") {
              localStorage.setItem('authToken', response.data.token);
                navigate('/adminDashboard');
                console.log('Login successful');
            } 
            else if (response.status === 200 && response.data.role === "STUDENT") {
                localStorage.setItem('authToken', response.data.token);
                navigate('/stduentDashboard');
                console.log('Login successful');
            } 
            // else if (response.status === 200 && response.data.role === "TEACHER") {
            //     localStorage.setItem('authToken', response.data.token);
            //     navigate('/stduentDashboard');
            //     console.log('Login successful');
            // }
            else {
                setError(response.data.message);
                Swal.fire({
                    title: 'Error!',
                    text: 'Login failed. Please check your credentials.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred. Please try again.');
            Swal.fire({
                title: 'Error!',
                text: 'Login failed. Please check your credentials.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };       
  return (
    <div>
    <div class="bg-gray-50">
      <div class="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div class="max-w-md w-full">
          <a href="javascript:void(0)"><img
            src="https://static.vecteezy.com/system/resources/previews/020/101/791/non_2x/admin-login-blue-gradient-concept-icon-administrator-account-learning-management-system-access-abstract-idea-thin-line-illustration-isolated-outline-drawing-vector.jpg" alt="logo" class="w-40 mb-8 mx-auto block" />
          </a>

          <div class="p-8 rounded-2xl bg-white shadow">
            <h2 class="text-slate-900 text-center text-3xl font-semibold">Sign in</h2>
            <form class="mt-12 space-y-6">
              <div>
                <label class="text-slate-800 text-sm font-medium mb-2 block">Email</label>
                <div class="relative flex items-center">
                  <input name="email" placeholder='Email Address' type='email' value={email} onChange={(e)=> setEmail(e.target.value)} required class="w-full text-slate-800 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>

              <div>
                <label class="text-slate-800 text-sm font-medium mb-2 block">Password</label>
                <div class="relative flex items-center">
                  <input name="password" type="password" id='password' value={password} onChange={(e)=>setPassoword(e.target.value)} required class="w-full text-slate-800 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter password" />
                  
                </div>
              </div>

              

              <div class="!mt-12">
                <button type="button" onClick={handleSubmit} class="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                  Sign in
                </button>
              </div>
              <p class="text-slate-800 text-sm !mt-6 text-center">Don't have an account? <a href="javascript:void(0);" class="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">Register here</a></p>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home