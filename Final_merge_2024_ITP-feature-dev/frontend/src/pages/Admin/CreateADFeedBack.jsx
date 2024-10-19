import React, { useState } from 'react';
import Spinner from '../../component/feedback/components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from '../../component/feedback/components/form/Input';
import { useForm, FormProvider } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import PMHeader from '../../component/feedback/components/navbar/PMHeader';
import Footer from '../../component/feedback/components/footer/Footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaStar } from 'react-icons/fa';

const sriLankaDistricts = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 'Hambantota',
  'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale',
  'Matara', 'Moneragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura',
  'Trincomalee', 'Vavuniya'
];

const CreateADFeedBack = () => {
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Set the default date to the current date
  const [isOpen, setIsOpen] = useState(false); // Manage the open state of DatePicker
  const [country, setCountry] = useState('');
  const [otherCountry, setOtherCountry] = useState('');
  const [district, setDistrict] = useState('');
  const [districtSelected, setDistrictSelected] = useState(false);
  const [customDistrict, setCustomDistrict] = useState('');
  const [hearAbout, setHearAbout] = useState('');
  const [customHearAbout, setCustomHearAbout] = useState('');
  const [reasonOfVisit, setReasonOfVisit] = useState('');
  const [customReasonOfVisit, setCustomReasonOfVisit] = useState('');
  const [rating, setRating] = useState(0);
  const [newlyCreatedId, setNewlyCreatedId] = useState(null); // State to store the ID after submission
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm();

  const toggleCalendar = () => setIsOpen(!isOpen); // Toggle the DatePicker visibility

  const handleSaveRawfbRequest = async (data) => {
    const formattedData = {
      ...data,
      chickinDate: selectedDate ? selectedDate.toISOString() : null,
      country: country === 'Others' ? otherCountry : country,
      district: country === 'Sri Lanka' ? district : customDistrict,
      hearAbout: hearAbout === 'Other' ? customHearAbout : hearAbout,
      resonOfVisit: reasonOfVisit === 'Other' ? customReasonOfVisit : reasonOfVisit,
      overAllRatting: rating,
    };
    console.log('Submitting data:', formattedData);

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/feedBackDetail', formattedData, {
        headers: { 'Content-Type': 'application/json' }
      });
      setLoading(false);
      setNewlyCreatedId(response.data._id); // Store the ID of the newly created entry
      enqueueSnackbar('Data submitted successfully!', { variant: 'success' });
    } catch (error) {
      setLoading(false);
      enqueueSnackbar('An error occurred. Please check the console for details.', { variant: 'error' });
      console.error(error);
    }
  };

  const renderStars = () => {
    return [...Array(5)].map((star, index) => {
      const ratingValue = index + 1;
      return (
        <label key={index} className="cursor-pointer">
          <input
            type="radio"
            name="rating"
            value={ratingValue}
            onClick={() => setRating(ratingValue)}
            className="hidden"
          />
          <FaStar
            className={`neumorphic-star ${ratingValue <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
            size={20}
          />
        </label>
      );
    });
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 min-h-screen flex flex-col justify-between">
      <PMHeader />
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
        {loading && <Spinner />}
        <div className="bg-gray-100 bg-opacity-90 rounded-xl shadow-lg p-8 w-full max-w-2xl">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSaveRawfbRequest)} className="space-y-6">
              <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">VALAMPURI HOTEL FEEDBACK</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  formtype="textarea"
                  type="text"
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  placeholder="Enter First Name"
                  validation={{ required: 'First Name is required' }}
                  className="neumorphic-input"
                />
                <Input
                  formtype="textarea"
                  type="text"
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter Last Name"
                  validation={{ required: 'Last Name is required' }}
                  className="neumorphic-input"
                />
              </div>

              <Input
                formtype="textarea"
                type="text"
                id="email"
                name="email"
                label="Email"
                placeholder="Enter Email"
                validation={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email address',
                  },
                }}
                className="neumorphic-input"
              />

              <Input
                formtype="textarea"
                type="text"
                id="telephone"
                name="telephone"
                label="Telephone"
                placeholder="Enter Telephone"
                validation={{
                  required: 'Telephone is required',
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Please enter only numbers in the telephone field',
                  },
                }}
                className="neumorphic-input"
              />

              <div className="relative w-full">
                <label className="block text-sm font-medium text-gray-800 mb-2">Check-in Date</label>
                <div className="flex items-center relative">
                  <input
                    type="text"
                    value={selectedDate ? selectedDate.toLocaleDateString() : ''}
                    readOnly
                    className="w-full p-3 border-none rounded-lg neumorphic-input pr-10"
                    onClick={toggleCalendar} // Open the calendar on click
                  />
                  <FaCalendarAlt
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    size={24}
                    onClick={toggleCalendar} // Open the calendar on icon click
                  />
                  {isOpen && (
                    <div className="absolute z-10 mt-2">
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => {
                          setSelectedDate(date);
                          setIsOpen(false); // Close the calendar after selecting the date
                        }}
                        maxDate={new Date()} // Prevent selecting a date greater than today
                        inline
                      />
                    </div>
                  )}
                </div>
              </div>

              <Input
                formtype="textarea"
                type="text"
                id="durationOfYouStay"
                name="durationOfYouStay"
                label="Duration Of Your Stay (Days)"
                placeholder="Enter Duration Of Your Stay"
                validation={{
                  required: 'Duration Of Your Stay is required',
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Please enter only numbers',
                  },
                }}
                className="neumorphic-input"
              />

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-800 mb-2">Country</label>
                <select
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setDistrictSelected(false); // Reset district selection on country change
                  }}
                  className="w-full p-3 border-none rounded-lg neumorphic-input"
                >
                  <option value="" disabled>Select a Country</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="India">India</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {country === 'Sri Lanka' && (
                districtSelected ? (
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-800 mb-2">Selected District</label>
                    <div className="p-3 border-none rounded-lg neumorphic-input">{district}</div>
                  </div>
                ) : (
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-800 mb-2">District</label>
                    <select
                      value={district}
                      onChange={(e) => {
                        setDistrict(e.target.value);
                        setDistrictSelected(true);
                      }}
                      className="w-full p-3 border-none rounded-lg neumorphic-input"
                      size={5}
                      style={{ height: 'auto', fontSize: '16px' }}
                    >
                      {sriLankaDistricts.map((district, index) => (
                        <option key={index} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>
                )
              )}

              {country === 'Others' && (
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-800 mb-2">Please Specify Your District</label>
                  <textarea
                    value={customDistrict}
                    onChange={(e) => setCustomDistrict(e.target.value)}
                    placeholder="Type your district here..."
                    className="w-full p-3 border-none rounded-lg neumorphic-input"
                    rows={1}
                  />
                </div>
              )}

              {/* Additional conditional logic for handling India or other countries */}
              {country === 'India' && (
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-800 mb-2">State (Optional)</label>
                  <textarea
                    value={customDistrict} // Optional state input for India
                    onChange={(e) => setCustomDistrict(e.target.value)}
                    placeholder="Type your state here..."
                    className="w-full p-3 border-none rounded-lg neumorphic-input"
                    rows={1}
                  />
                </div>
              )}

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-800 mb-2">Hear About</label>
                <select
                  value={hearAbout}
                  onChange={(e) => setHearAbout(e.target.value)}
                  className="w-full p-3 border-none rounded-lg neumorphic-input"
                >
                  <option value="" disabled>Select an Option</option>
                  <option value="Friends and Family">Friends and Family</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {hearAbout === 'Other' && (
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-800 mb-2">Please Specify</label>
                  <textarea
                    value={customHearAbout}
                    onChange={(e) => setCustomHearAbout(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full p-3 border-none rounded-lg neumorphic-input"
                    rows={1}
                  />
                </div>
              )}

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-800 mb-2">Reason of Visit</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="vacation"
                      name="reasonOfVisit"
                      value="Vacation"
                      checked={reasonOfVisit === 'Vacation'}
                      onChange={(e) => setReasonOfVisit(e.target.value)}
                      className="text-blue-500 focus:ring-blue-500 focus:ring-2 h-4 w-4"
                    />
                    <label htmlFor="vacation" className="ml-2 text-gray-800">Vacation</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="wedding"
                      name="reasonOfVisit"
                      value="Wedding"
                      checked={reasonOfVisit === 'Wedding'}
                      onChange={(e) => setReasonOfVisit(e.target.value)}
                      className="text-blue-500 focus:ring-blue-500 focus:ring-2 h-4 w-4"
                    />
                    <label htmlFor="wedding" className="ml-2 text-gray-800">Wedding</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="business"
                      name="reasonOfVisit"
                      value="Business"
                      checked={reasonOfVisit === 'Business'}
                      onChange={(e) => setReasonOfVisit(e.target.value)}
                      className="text-blue-500 focus:ring-blue-500 focus:ring-2 h-4 w-4"
                    />
                    <label htmlFor="business" className="ml-2 text-gray-800">Business</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="otherReason"
                      name="reasonOfVisit"
                      value="Other"
                      checked={reasonOfVisit === 'Other'}
                      onChange={(e) => setReasonOfVisit(e.target.value)}
                      className="text-blue-500 focus:ring-blue-500 focus:ring-2 h-4 w-4"
                    />
                    <label htmlFor="otherReason" className="ml-2 text-gray-800">Other</label>
                  </div>
                </div>
              </div>
              {reasonOfVisit === 'Other' && (
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-800 mb-2">Please Specify</label>
                  <textarea
                    value={customReasonOfVisit}
                    onChange={(e) => setCustomReasonOfVisit(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full p-3 border-none rounded-lg neumorphic-input"
                    rows={1}
                  />
                </div>
              )}

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-800 mb-2">Overall Rating For Hotel</label>
                <div className="flex space-x-2 ">{renderStars()}</div>
              </div>

              <Input
                formtype="textarea"
                type="text"
                id="suggestion"
                name="suggestion"
                label="Suggestion"
                placeholder="Enter Suggestion"
                validation={{ required: 'Suggestion is required' }}
                className="neumorphic-input"
                rows={3}
              />

              <button
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-black rounded-lg font-semibold text-lg hover:from-blue-400 hover:to-indigo-500 transition duration-300 neumorphic-button"
                type="submit"
              >
                Submit
              </button>
            </form>
          </FormProvider>

          {/* Conditionally render the "Change Your Entered Details" button after form submission */}
          {newlyCreatedId && (
            <button
              className="mt-6 w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-black rounded-lg font-semibold text-lg hover:from-yellow-400 hover:to-orange-500 transition duration-300 neumorphic-button"
              onClick={() => navigate(`/feedBackDetail/edit/${newlyCreatedId}`)}
            >
              Change Your Entered Details
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateADFeedBack;
