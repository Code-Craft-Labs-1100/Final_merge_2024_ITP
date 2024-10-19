import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoSearch } from 'react-icons/io5';

const SearchBar = ({ placeholder, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="flex justify-end mt-4 mb-4 pr-4">
      <div className="relative flex items-center">

        {/* Search Icon Container */}
        <div className="bg-black p-2 flex items-center h-[45px] border border-white rounded-l-lg">
          <IoSearch className="text-white" size={20} />
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
          className="px-2 py-2 w-[300px] h-[45px] font-BreeSerif border border-white text-black focus:outline-none focus:ring-0 rounded-r-none"
        />

        {/* Search Button */}
        <button
          className="bg-white p-2 flex items-center h-[45px] border border-white text-black rounded-r-lg hover:bg-black hover:text-white transition duration-200"
          onClick={() => onSearch(searchTerm)}
        >
          Search
        </button>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
