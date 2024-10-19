import React, { useState, useEffect } from 'react';
import Spinner from '../../component/feedback/components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import BackButton from '../../component/feedback/components/button/BackButton';
import PMHeader from '../../component/feedback/components/navbar/PMHeader';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaEdit, FaEye, FaTrash, FaFilePdf } from 'react-icons/fa';

const ViewADFeedBack = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [chickinDate, setChickinDate] = useState('');
  const [durationOfYouStay, setDurationOfYouStay] = useState('');
  const [country, setCountry] = useState('');
  const [district, setDistrict] = useState('');
  const [hearAbout, setHearAbout] = useState('');
  const [resonOfVisit, setResonOfVisit] = useState('');
  const [overAllRatting, setOverAllRatting] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/feedBackDetail/${id}`)
      .then((response) => {
        const {
          firstName, lastName, email, telephone, chickinDate, durationOfYouStay, country, district, hearAbout, resonOfVisit, overAllRatting, suggestion
        } = response.data;

        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setTelephone(telephone);
        setChickinDate(chickinDate);
        setDurationOfYouStay(durationOfYouStay);
        setCountry(country);
        setDistrict(district);
        setHearAbout(hearAbout);
        setResonOfVisit(resonOfVisit);
        setOverAllRatting(overAllRatting);
        setSuggestion(suggestion);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check the console.');
        console.log(error);
      });
  }, [id]);

  const handleUpdateStudent = () => {
    const data = {
      firstName,
      lastName,
      email,
      telephone,
      chickinDate,
      durationOfYouStay,
      country,
      district,
      hearAbout,
      resonOfVisit,
      overAllRatting,
      suggestion,
    };

    setLoading(true);
    axios.put(`http://localhost:5555/feedBackDetail/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Profile updated successfully', { variant: 'success' });
        navigate('/RegisterDetails');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error updating profile', { variant: 'error' });
        console.log(error);
      });
  };

  const handlePrint = () => {
    const input = document.getElementById('pdf-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save("feedBack_details.pdf");
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <PMHeader />
      <div className="container mx-auto px-5">
        <BackButton />
        {loading && <Spinner />}

        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl mx-auto" id="pdf-content">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Register Profile</h1>

          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <span className="font-medium text-gray-700">First Name:</span>
              <span className="text-gray-900">{firstName}</span>
            </div>

            <div className="flex justify-between items-center border-b pb-4">
              <span className="font-medium text-gray-700">Last Name:</span>
              <span className="text-gray-900">{lastName}</span>
            </div>

            <div className="flex justify-between items-center border-b pb-4">
              <span className="font-medium text-gray-700">Email:</span>
              <span className="text-gray-900">{email}</span>
            </div>

            <div className="flex justify-between items-center border-b pb-4">
              <span className="font-medium text-gray-700">Telephone:</span>
              <span className="text-gray-900">{telephone}</span>
            </div>

            <div className="flex justify-between items-center border-b pb-4">
              <span className="font-medium text-gray-700">Check-in Date:</span>
              <span className="text-gray-900">{chickinDate}</span>
            </div>

            <div className="flex justify-between items-center border-b pb-4">
              <span className="font-medium text-gray-700">Duration of Stay:</span>
              <span className="text-gray-900">{durationOfYouStay}</span>
            </div>

            <div className="flex justify-between items-center border-b pb-4">
              <span className="font-medium text-gray-700">Country:</span>
              <span className="text-gray-900">{country}</span>
            </div>

            <div className="flex justify-between items-center border-b pb-4">
              <span className="font-medium text-gray-700">District:</span>
              <span className="text-gray-900">{district}</span>
            </div>

            <div className="flex justify-between items-center border-b pb-4">
              <span className="font-medium text-gray-700">Hear About:</span>
              <span className="text-gray-900">{hearAbout}</span>
            </div>

            <div className="flex justify-between items-center border-b pb-4">
              <span className="font-medium text-gray-700">Reason of Visit:</span>
              <span className="text-gray-900">{resonOfVisit}</span>
            </div>

            <div className="flex justify-between items-center border-b pb-4">
              <span className="font-medium text-gray-700">Overall Rating:</span>
              <span className="text-gray-900">{overAllRatting}</span>
            </div>

            <div className="flex justify-between items-center border-b pb-4">
              <span className="font-medium text-gray-700">Suggestion:</span>
              <span className="text-gray-900">{suggestion}</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between mt-6 gap-4">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg w-full md:w-auto"
              onClick={handleUpdateStudent}
            >
              <FaEdit className="inline-block mr-2" /> Update
            </button>

            <button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg w-full md:w-auto"
              onClick={() => navigate('/RegisterDetails')}
            >
              <FaTrash className="inline-block mr-2" /> Cancel
            </button>

            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg w-full md:w-auto"
              onClick={handlePrint}
            >
              <FaFilePdf className="inline-block mr-2" /> Print as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewADFeedBack;
