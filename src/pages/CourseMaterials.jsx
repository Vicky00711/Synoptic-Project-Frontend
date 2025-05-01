import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // To get gradeId from URL if needed
import Navbar from '../components/NavigationStudent';
import { getLocalEndpoint } from '../APICalls';

function CourseMaterials() {
  const [materials, setMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { gradeId } = useParams(); 

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(`${getLocalEndpoint()}/api/students/profile/course-materials`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });
      setMaterials(response.data);
      console.log('Course materials:', response.data);
    } catch (error) {
      console.error('Error fetching course materials:', error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [gradeId]);

  const handleDownload = async (materialId) => {
    try {
      const response = await axios.get(`${getLocalEndpoint()}/api/students/course-materials/download/${materialId}`, {
        responseType: 'blob', 
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
    console.log('Download response:', response.data);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `CourseMaterial-${materialId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading material:', error);
    }
  };

  // Filter materials based on search term
  const filteredMaterials = materials.filter(material =>
    `${material.subjectName} ${material.topic}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      <div className="text-gray-900 bg-gray-200">
        <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl">Course Materials</h1>
          <input
            type="text"
            placeholder="Search by subject or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-2 sm:mt-0 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
          />
        </div>
        <div className="px-3 py-4 flex justify-center">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 px-5">ID</th>
                <th className="text-left p-3 px-5">Subject</th>
                <th className="text-left p-3 px-5">Topic</th>
                <th className="text-right p-3 px-5">Download</th>
              </tr>
            </thead>
            <tbody>
  {filteredMaterials.map((material, index) => (
    <tr key={material.materialId || index} className="border-b hover:bg-orange-100 bg-gray-100">
      <td className="p-3 px-5">{material.id}</td>
      <td className="p-3 px-5">{material.subjectName}</td>
      <td className="p-3 px-5">{material.topic}</td>
      <td className="p-3 pr-0 flex justify-end">
        <button
          className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-4 rounded mr-2"
          onClick={() => handleDownload(material.id)}
        >
          Download
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

export default CourseMaterials;
