import React from 'react'
import { useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function Navigation() {
    const navigate = useNavigate();
    const handleLogout = () => {
        Swal.fire({
  title: 'Success!',
  text: 'You have successfully logged out',
  icon: 'success',
  confirmButtonText: 'Cool'
  
})    
        localStorage.removeItem('authToken');
        navigate('/');
    }    


  return (
    <div>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            {/* ✅ Custom SVG starts here */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-16 h-16 p-2 rounded-full">
              <defs>
                <style>{`
                  .cls-1{fill:#a1d8df}
                  .cls-2{fill:#68c7d3}
                  .cls-3{fill:#d1e6e9}
                  .cls-4{fill:#30acc2}
                `}</style>
              </defs>
              <g id="School">
                <path className="cls-1" d="M30 9H2l2-6h24l2 6z"/>
                <path className="cls-2" d="M1 29h30v2H1z"/>
                <path className="cls-1" d="M10 9h12v20H10z"/>
                <path className="cls-3" d="M2 9h8v20H2zM22 9h8v20h-8z"/>
                <path className="cls-2" d="M1 9h9v2H1zM22 9h9v2h-9zM8 17H4v-2a2 2 0 0 1 4 0zM8 27H4v-2a2 2 0 0 1 4 0zM28 17h-4v-2a2 2 0 0 1 4 0zM28 27h-4v-2a2 2 0 0 1 4 0z"/>
                <path className="cls-4" d="M9 7h14v2H9z"/>
                <path className="cls-2" d="M22 7H10l6-6 6 6z"/>
                <path className="cls-4" d="M18 29h-4v-4a2 2 0 0 1 4 0z"/>
                <path className="cls-1" d="M2 19h8v2H2z"/>
                <path className="cls-2" d="M10 19h12v2H10z"/>
                <path className="cls-1" d="M22 19h8v2h-8z"/>
                <path className="cls-2" d="M20 13c-1.55-.52-2.81-1.19-4 0-1.2-1.2-2.5-.5-4 0l1 3h6z"/>
                <path className="cls-4" d="M15.29 16.71A1.26 1.26 0 0 0 14 16.4l-1.68.6-.64-1.9c1.63-.54 2.81-1.16 4.32-.3 1.51-.85 2.69-.24 4.32.3l-.64 1.9c-1.75-.59-2.3-.92-3-.24a1 1 0 0 1-1.39-.05z"/>
              </g>
            </svg>
            <span className="ml-3 text-xl">SCHOOL ADMINISTRATION</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link to='/adminDashboard' className="mr-5 hover:text-gray-900">Dashboard</Link>
            <Link to='/createUser' className="mr-5 hover:text-gray-900">Create Users</Link>
            <a className="mr-5 hover:text-gray-900">Create Teachers</a>
            <Link to='/class' className="mr-5 hover:text-gray-900">Add Classes</Link>
          </nav>
          <button onClick={handleLogout} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            Logout
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>
    </div>
  )
}

export default Navigation
