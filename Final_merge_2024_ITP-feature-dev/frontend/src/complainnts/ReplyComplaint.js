import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ReplyComplaint = () => {
  const { id } = useParams(); // Get the complaint ID from the URL parameters
  const [complaint, setComplaint] = useState(null);
  const [reply, setReply] = useState('');
  const navigate = useNavigate();

  // Fetch the complaint details
  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/complaints/${id}`);
        setComplaint(response.data);
        // If a reply already exists, set it in the state
        if (response.data.reply) {
          setReply(response.data.reply);
        }
      } catch (error) {
        console.error('Error fetching complaint:', error);
      }
    };

    fetchComplaint();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:5000/complaints/reply/${id}`, { reply });
      alert('Reply sent successfully!');
      navigate('/allcomplaints'); // Redirect to the view complaints page
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Error sending reply. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-7xl mx-auto bg-white p-6 rounded-lg shadow-md mt-14">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Reply to Complaint</h2>

        {complaint ? (
          <div className='max-w-5xl'>
            <h3 className="text-lg font-semibold">Complaint Details</h3>
            <p><strong>Email:</strong> {complaint.email}</p>
            <p><strong>Title:</strong> {complaint.title}</p>
            <p><strong>Description:</strong> {complaint.description}</p>
            <p><strong>Status:</strong> {complaint.status}</p>

            {complaint.reply && (
              <div className="mt-4 p-4 bg-blue-100 border border-blue-300 rounded-md">
                <h4 className="font-semibold">Previous Reply:</h4>
                <p>{complaint.reply}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6">
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                rows="4"
                placeholder="Write your reply here..."
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
              >
                Send Reply
              </button>
            </form>
          </div>
        ) : (
          <p className="text-gray-700">Loading complaint details...</p>
        )}
      </div>
    </div>
  );
};

export default ReplyComplaint;
