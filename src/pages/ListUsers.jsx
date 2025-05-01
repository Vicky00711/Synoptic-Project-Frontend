import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../components/Navigation';
import { getLocalEndpoint } from '../APICalls';

function ListUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${getLocalEndpoint()}/api/users/list-users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`${getLocalEndpoint()}/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'User deleted successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Filter users by search term
  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      <div className="text-gray-900 bg-gray-200">
        <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl">Users</h1>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-2 sm:mt-0 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
          />
        </div>
        <div className="px-3 py-4 flex justify-center">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 px-5">User Id</th>
                <th className="text-left p-3 px-5">Name</th>
                <th className="text-left p-3 px-5">Email</th>
                <th className="text-left p-3 px-5">Role</th>
                <th className="text-right p-3 px-5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.usersId} className="border-b hover:bg-orange-100 bg-gray-100">
                  <td className="p-3 px-5">{user.usersId}</td>
                  <td className="p-3 px-5">{user.firstName} {user.lastName}</td>
                  <td className="p-3 px-5">{user.email}</td>
                  <td className="p-3 px-5">{user.role}</td>
                  <td className="p-3 pr-0 flex justify-end">
                    <button
                      className="text-sm bg-yellow-700 hover:bg-blue-700 text-white py-1 px-2 rounded-l mr-2"
                      onClick={() => navigate(`/editUser/${user.usersId}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2"
                      onClick={() => navigate(`/createStudent/${user.usersId}`)}
                    >
                      Add Details
                    </button>
                    <button
                      className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded-r ml-1 mr-2"
                      onClick={() => handleDelete(user.usersId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No users match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListUsers;
