import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../components/Navigation';

function ListStudents() {
  const { gradeId } = useParams();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/admin/grade-level/${gradeId}/students`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load students.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [gradeId]);

  const filteredStudents = students.filter(student =>
    `${student.users.firstName} ${student.users.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="text-gray-900 bg-gray-200">
        <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl">Students in Grade {gradeId}</h1>
          <input
            type="text"
            placeholder="Search by student name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-2 sm:mt-0 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
          />
        </div>
        <div className="px-3 py-4 flex justify-center">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 px-5">Student ID</th>
                <th className="text-left p-3 px-5">Name</th>
                <th className="text-left p-3 px-5">Email</th>
                <th className="text-left p-3 px-5">Parent Contact</th>
                <th className="text-left p-3 px-5">Enrollment Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.studentId} className="border-b hover:bg-orange-100 bg-gray-100">
                  <td className="p-3 px-5">{student.studentId}</td>
                  <td className="p-3 px-5">{student.users.firstName} {student.users.lastName}</td>
                  <td className="p-3 px-5">{student.users.email}</td>
                  <td className="p-3 px-5">{student.parentContact}</td>
                  <td className="p-3 px-5">{student.enrollmentDate}</td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No students match your search.
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

export default ListStudents;