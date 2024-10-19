import React, { useState, useEffect, useRef } from 'react';
import Spinner from '../../component/feedback/components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import PMHeader from '../../component/feedback/components/navbar/PMHeader';
import BackButton from '../../component/feedback/components/button/BackButton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';

const UpdateADFeedBack = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [chickinDate, setChickinDate] = useState(null);
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
  const datePickerRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/feedBackDetail/${id}`)
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setTelephone(response.data.telephone);
        setChickinDate(new Date(response.data.chickinDate));
        setDurationOfYouStay(response.data.durationOfYouStay);
        setCountry(response.data.country);
        setDistrict(response.data.district);
        setHearAbout(response.data.hearAbout);
        setResonOfVisit(response.data.resonOfVisit);
        setOverAllRatting(response.data.overAllRatting);
        setSuggestion(response.data.suggestion);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check the console');
        console.log(error);
      });
  }, [id]);

  const handleUpdateRawsuRequest = () => {
    const data = {
      firstName,
      lastName,
      email,
      telephone,
      chickinDate: chickinDate ? chickinDate.toISOString() : null,
      durationOfYouStay,
      country,
      district,
      hearAbout,
      resonOfVisit,
      overAllRatting,
      suggestion,
    };
    setLoading(true);
    axios.put(`http://localhost:5000/feedBackDetail/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Request updated successfully', { variant: 'success' });
        navigate('/feedBackDetail/create');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='min-h-screen bg-gray-100 text-gray-900 flex flex-col justify-between'>
      <PMHeader />
      <BackButton />
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col bg-gray-100 rounded-xl w-[600px] p-6 mx-auto shadow-lg'>
        <h1 className='text-3xl my-4 text-center'>Update Feedback Reply</h1>

        <div className='my-4'>
          <label className='block text-lg mb-2'>First Name</label>
          <input
            className='neumorphic-input'
            type='text'
            id='firstName'
            name='firstName'
            placeholder='Enter First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className='my-4'>
          <label className='block text-lg mb-2'>Last Name</label>
          <input
            className='neumorphic-input'
            type='text'
            id='lastName'
            name='lastName'
            placeholder='Enter Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className='my-4'>
          <label className='block text-lg mb-2'>Email</label>
          <input
            className='neumorphic-input'
            type='email'
            id='email'
            name='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='my-4'>
          <label className='block text-lg mb-2'>Telephone</label>
          <input
            className='neumorphic-input'
            type='text'
            id='telephone'
            name='telephone'
            placeholder='Enter Telephone'
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>

        <div className='my-4'>
          <label className='block text-lg mb-2'>Check-in Date</label>
          <div className='relative flex items-center'>
            <DatePicker
              selected={chickinDate}
              onChange={(date) => setChickinDate(date)}
              dateFormat='MM/dd/yyyy'
              className='neumorphic-input'
              placeholderText='Select Date'
              ref={datePickerRef}
            />
            <FaCalendarAlt
              className='absolute right-4 text-gray-500 cursor-pointer'
              size={24}
              onClick={() => datePickerRef.current.setOpen(true)}
            />
          </div>
        </div>

        <div className='my-4'>
          <label className='block text-lg mb-2'>Duration Of Your Stay (Days)</label>
          <input
            className='neumorphic-input'
            type='text'
            id='durationOfYouStay'
            name='durationOfYouStay'
            placeholder='Enter Duration Of Your Stay'
            value={durationOfYouStay}
            onChange={(e) => setDurationOfYouStay(e.target.value)}
          />
        </div>

        <div className='my-4'>
          <label className='block text-lg mb-2'>Country</label>
          <input
            className='neumorphic-input'
            type='text'
            id='country'
            name='country'
            placeholder='Enter Country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div className='my-4'>
          <label className='block text-lg mb-2'>District</label>
          <input
            className='neumorphic-input'
            type='text'
            id='district'
            name='district'
            placeholder='Enter District'
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
        </div>

        <div className='my-4'>
          <label className='block text-lg mb-2'>Hear About</label>
          <input
            className='neumorphic-input'
            type='text'
            id='hearAbout'
            name='hearAbout'
            placeholder='Enter Hear About'
            value={hearAbout}
            onChange={(e) => setHearAbout(e.target.value)}
          />
        </div>

        <div className='my-4'>
          <label className='block text-lg mb-2'>Reason Of Visit</label>
          <input
            className='neumorphic-input'
            type='text'
            id='resonOfVisit'
            name='resonOfVisit'
            placeholder='Enter Reason Of Visit'
            value={resonOfVisit}
            onChange={(e) => setResonOfVisit(e.target.value)}
          />
        </div>

        <div className='my-4'>
          <label className='block text-lg mb-2'>Overall Rating</label>
          <input
            className='neumorphic-input'
            type='text'
            id='overAllRatting'
            name='overAllRatting'
            placeholder='Enter Overall Rating'
            value={overAllRatting}
            onChange={(e) => setOverAllRatting(e.target.value)}
          />
        </div>

        <div className='my-4'>
          <label className='block text-lg mb-2'>Suggestion</label>
          <textarea
            className='neumorphic-input'
            id='suggestion'
            name='suggestion'
            placeholder='Enter Suggestion'
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            rows={3}
          />
        </div>

        <button
          className='neumorphic-button bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg w-full font-semibold hover:from-blue-400 hover:to-indigo-500 transition duration-300'
          onClick={handleUpdateRawsuRequest}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UpdateADFeedBack;
