import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../components/Navigation';

function AddCourseMaterials() {
  const { gradeId } = useParams();
  const [subjectName, setSubjectName] = useState('');
  const [topic, setTopic] = useState('');
  const [file, setFile] = useState(null);
  const [materials, setMaterials] = useState([]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('subjectName', subjectName);
    formData.append('topic', topic);
    formData.append('file', file);

    try {
      await axios.post(`http://Administrationsystem-env.eba-mm829pa2.eu-north-1.elasticbeanstalk.com/api/course-materials/upload/${gradeId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire('Uploaded!', 'Course material uploaded successfully.', 'success');
      fetchMaterials(); // Refresh the list
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Upload failed.', 'error');
    }
  };

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(`http://Administrationsystem-env.eba-mm829pa2.eu-north-1.elasticbeanstalk.com/api/course-materials/grade/${gradeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setMaterials(response.data);
    } catch (err) {
      console.error('Error fetching materials:', err);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [gradeId]);

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Upload Course Material (Grade ID: {gradeId})</h2>
        <input
          type="text"
          placeholder="Subject Name"
          className="block w-full mb-3 border p-2"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Topic"
          className="block w-full mb-3 border p-2"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <input
          type="file"
          className="block w-full mb-3"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>

        <hr className="my-6" />

        <h3 className="text-lg font-semibold mb-2">Uploaded Materials</h3>
        <ul className="space-y-2">
          {materials.map((mat) => (
            <li key={mat.id} className="border p-2 rounded">
              <strong>{mat.subjectName}</strong> - {mat.topic} <br />
              <a href={`http://localhost:8080/${mat.filePath}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                View Material
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddCourseMaterials;
