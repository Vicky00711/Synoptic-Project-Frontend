import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../components/Navigation';
import { getLocalEndpoint } from '../APICalls';

function AddTimeTable() {
  const { gradeId } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile && selectedFile.type === "application/pdf") {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      Swal.fire('No File', 'Please select a PDF file to upload.', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${getLocalEndpoint()}/api/admin/upload-timetable/${gradeId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire('Uploaded!', 'Timetable uploaded successfully.', 'success');
      navigate('/listClass');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to upload timetable.', 'error');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full space-y-6 bg-white p-8 shadow-md rounded-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">Upload Timetable</h2>
          <p className="text-center text-gray-600 mb-4">For Grade ID: <strong>{gradeId}</strong></p>

          <form onSubmit={handleUpload}>
            <div className="mb-4">
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                Select PDF File
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            {previewUrl && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Preview:</h3>
                <embed src={previewUrl} type="application/pdf" width="100%" height="500px" className="rounded border" />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
            >
              Upload Timetable
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTimeTable;
