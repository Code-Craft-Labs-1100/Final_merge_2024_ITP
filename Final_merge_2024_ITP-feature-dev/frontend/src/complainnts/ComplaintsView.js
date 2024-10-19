import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import autotable for tables in jsPDF

const ComplaintsView = () => {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch complaints from the backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/complaints');
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  // Delete complaint
  const handleDelete = async (complaintId) => {
    try {
      await axios.delete(`http://localhost:5000/complaints/${complaintId}`);
      setComplaints(complaints.filter((complaint) => complaint._id !== complaintId));
      alert('Complaint deleted successfully');
    } catch (error) {
      console.error('Error deleting complaint:', error);
    }
  };

  // Update complaint status
  const handleUpdateStatus = async (complaintId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/complaints/${complaintId}`, { status: newStatus });
      setComplaints(complaints.map((complaint) =>
        complaint._id === complaintId ? { ...complaint, status: newStatus } : complaint
      ));
      alert('Complaint status updated successfully');
    } catch (error) {
      console.error('Error updating complaint status:', error);
    }
  };

  // Navigate to reply complaint page
  const handleReply = (complaintId) => {
    navigate(`/reply-complaint/${complaintId}`); // Navigate to reply page with complaintId
  };

  // Search functionality
  const filteredComplaints = complaints.filter(complaint =>
    complaint.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate PDF report
  const generateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Complaints Report', 14, 22);

    const tableColumn = ["Email", "Title", "Description", "Reply", "Status", "Created At"];
    const tableRows = filteredComplaints.map(complaint => [
      complaint.email,
      complaint.title,
      complaint.description,
      complaint.reply || 'No reply yet',
      complaint.status,
      new Date(complaint.createdAt).toLocaleDateString()
    ]);

    doc.autoTable(tableColumn, tableRows, { startY: 30 });
    doc.save('complaints_report.pdf');
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md mt-32">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Complaints List</h2>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={generateReport}
            className="ml-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
          >
            Generate Report
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-600 font-medium border-b">Email</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium border-b">Title</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium border-b">Description</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium border-b">Reply</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium border-b">Status</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium border-b">Created At</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((complaint) => (
                  <tr key={complaint._id} className="border-b">
                    <td className="px-4 py-2 text-gray-700">{complaint.email}</td>
                    <td className="px-4 py-2 text-gray-700">{complaint.title}</td>
                    <td className="px-4 py-2 text-gray-700">{complaint.description}</td>
                    <td className="px-4 py-2 text-gray-700">{complaint.reply || 'No reply yet'}</td>
                    <td className="px-4 py-2 text-gray-700">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          complaint.status === 'resolved'
                            ? 'bg-green-100 text-green-800'
                            : complaint.status === 'in progress'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {complaint.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-gray-700 space-x-2">
                      <button
                        onClick={() => handleUpdateStatus(complaint._id, complaint.status === 'open' ? 'in progress' : 'resolved')}
                        className="px-3 py-1 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600"
                      >
                        {complaint.status === 'open' ? 'In Progress' : 'Resolved'}
                      </button>

                      <button
                        onClick={() => handleDelete(complaint._id)}
                        className="px-3 py-1 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => handleReply(complaint._id)}
                        className="px-3 py-1 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                      >
                        Reply
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-2 text-center text-gray-700">
                    No complaints found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComplaintsView;
