import React, { useState } from "react";
import axios from 'axios';
import { message } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import Transport from "../../images/transport.png"
import { RiArrowGoBackLine } from "react-icons/ri";

const Addmachine = () => {
  const [customername, setcustomername] = useState("");
  const [vehicletype, setvehicletype] = useState("");
  const [rentdate, setrentdate] = useState("");
  const [claimdate, setclaimdate] = useState("");
  const [rentprice, setrentprice] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateclaindate = () => {
    if (new Date(claimdate) <= new Date(rentdate)) {
      setError("Claimdate date must be a future date relative to the Rentdate.");
      return false;
    }
    setError("");
    return true;
  };

  const addtransport = async (event) => {
    event.preventDefault();

    if (!validateclaindate()) {
      return;
    }

    const transport = {
      customername,
      vehicletype,
      rentdate,
      claimdate,
      rentprice,
   
    };

    try {
      const result = await axios.post("http://localhost:5000/api/addtransport", transport);
      console.log(result.data);

      message.success('Transport added successfully!').then(() => {
        navigate("/transportHome");
        window.location.reload()
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-white-green">
        <div className="container flex justify-between items-start mr-20 mb-5">
          {/* Image container */}
          <div className="w-[600px]">
          <Link to={"/transportHome"}>
          <RiArrowGoBackLine className="mt-5 ml-5 w-8 h-8" /></Link>
            <h2 className="font-bold text-dark text-3xl font-custom mt-2 mb-6 ml-8">Add new Transport</h2>
            <img src={Transport} alt="Machine" className="w-full h-auto rounded-xl mt-12 ml-44" />
           <h1 className="ml-96 text-center text-black font-semibold"> Resposible <span className="text-green-500">transeport</span> service.</h1>
          </div>
          {/* Form container */}
          <div className="w-[500px] max-w-2xl bg-white shadow-xl rounded-3xl p-6 mt-20">
            <form onSubmit={addtransport}>
              <div className="flex flex-col mt-6">
                <label htmlFor="machineName" className="text-gray-700 font-bold mb-2">Customer name</label>
                <input
                  type="text"
                  value={customername}
                  onChange={(e) => setcustomername(e.target.value)}
                  placeholder="Machine name"
                  required
                  className="p-2 block w-full rounded-xl bg-gray-100 text-black border-none placeholder-gray-400 placeholder-opacity-50 font-custom text-md"
                />
              </div>
              <div className="flex flex-col mt-6">
                <label htmlFor="machineName" className="text-gray-700 font-bold mb-2">Vehicle type</label>
                <select
              value={vehicletype}
              onChange={(e) => setvehicletype(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl block w-full p-2.5"
            >
              <option  value="">Select here</option>
              <option value="car">Car</option>
              <option value="van">Van</option>
              <option value="motobick">Motobick</option>
            </select>
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="serviceDate" className="text-gray-700 font-bold mb-2">Rent date</label>
                <input
                  type="date"
                  value={rentdate}
                  onChange={(e) => setrentdate(e.target.value)}
                  required
                  className="p-2 block w-full rounded-xl bg-gray-100 border-none focus:outline-none placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="nextServiceDate" className="text-gray-700 font-bold mb-2">Claim date</label>
                <input
                  type="date"
                  value={claimdate}
                  onChange={(e) => setclaimdate(e.target.value)}
                  required
                  className="p-2 block w-full rounded-xl bg-gray-100 border-none focus:outline-none placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="cost" className="text-gray-700 font-bold mb-2">Rent price</label>
                <input
                  type="number"
                  value={rentprice}
                  onChange={(e) => setrentprice(e.target.value)}
                  required
                  placeholder='Cost'
                  className="p-2 block w-full rounded-xl bg-gray-100 border-none focus:outline-none placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                />
              </div>
              
              <div className="mt-8 mb-2">
                <button
                  type="submit"
                  className="text-white bg-blue-500 block w-full font-semibold rounded-md text-md px-5 py-2.5 text-center transition-transform duration-300 ease-in-out transform hover:scale-105"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default Addmachine;
