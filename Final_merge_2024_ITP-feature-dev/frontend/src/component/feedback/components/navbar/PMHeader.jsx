import React from 'react';
import { Link } from 'react-router-dom';

const PMHeader = () => {
  return (
    <div>
      {/* Black and White Header Container */}
      <div className="flex h-[70px] flex-row justify-between bg-black text-white w-full pb-3 items-center">
        <div className="flex-1 flex justify-center">
          <Link to="/" className="flex justify-center items-center w-full">
            <div className="text-white font-bold text-2xl">FEEDBACK MANAGEMENT</div>
          </Link>
        </div>
        <div className="flex h-[70px] justify-center items-center mr-6">
          <button className="h-10 w-28 text-white bg-black border border-white rounded-full hover:bg-gray-700 transition-all duration-300">
            LogOut
          </button>
        </div>
      </div>

      {/* White Navigation Bar */}
      <div className="flex h-[50px] flex-row justify-between bg-white text-black shadow-md w-full pb-3 font-BreeSerif">
        <div className="flex flex-row h-[66px] justify-between mt-1 mb-2 ml-12">
          <Link to="/feedBackDetail/create">
            <button className="h-10 w-60 text-black bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-all duration-300 ml-4">
              Home
            </button>
          </Link>
          <Link to="/FeedBackDetails">
            <button className="h-10 w-60 text-black bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-all duration-300 ml-4">
              FeedBack Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PMHeader;
