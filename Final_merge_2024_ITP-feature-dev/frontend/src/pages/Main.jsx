import React from 'react';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between items-center min-h-screen py-10">
      <div className="flex justify-between space-x-4 mt-64">
        <button onClick={() => navigate('/list')} className="px-4 py-2 bg-blue-500 text-white rounded" >Admin</button>
        <button onClick={() => navigate('/transportHome')} className="px-4 py-2 bg-blue-500 text-white rounded">Transport</button>
        <button onClick={() => navigate('/employee')} className="px-4 py-2 bg-blue-500 text-white rounded">Employee</button>
        <button onClick={() => navigate('/homefood')} className="px-4 py-2 bg-blue-500 text-white rounded">Food</button>
        <button onClick={() => navigate('/inventaryHome')} className="px-4 py-2 bg-blue-500 text-white rounded">Inventory</button>
        <button onClick={() => navigate('/allcomplaints')} className="px-4 py-2 bg-blue-500 text-white rounded">Complaints</button>
        <button onClick={() => navigate('/FeedBackDetails')} className="px-4 py-2 bg-blue-500 text-white rounded">Feedback</button>
        <button onClick={() => navigate('/room-reservation')} className="px-4 py-2 bg-blue-500 text-white rounded">Reservation</button>
      </div>
    </div>
  );
}

export default Main;
