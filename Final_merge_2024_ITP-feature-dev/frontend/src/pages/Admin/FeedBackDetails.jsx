import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../component/feedback/components/Spinner';
import { Link } from 'react-router-dom';
import SearchBar from '../../component/feedback/components/SearchBar';
import AddButton from '../../component/feedback/components/button2/AddButton';
import DeleteButton from '../../component/feedback/components/button2/DeleteButton';
import EditButton from '../../component/feedback/components/button2/EditButton';
import ViewButton from '../../component/feedback/components/button2/ViewButton';
import PMHeader from '../../component/feedback/components/navbar/PMHeader';
import Footer from '../../component/feedback/components/footer/Footer';
import { format } from 'date-fns'; // Importing date-fns for formatting

const FeedBackDetails = () => {
  const [smshops, setsmShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [reasonOfVisitFilter, setReasonOfVisitFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [averageRating, setAverageRating] = useState(0);

  const headers = ['First Name', 'Last Name', 'Email', 'Telephone', 'Check-in Date', 'Duration of Stay', 'Country', 'District', 'Hear About', 'Reason of Visit', 'Overall Rating /5', 'Suggestion', 'Actions'];

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/feedBackDetail')
      .then((response) => {
        const data = response.data.data;
        setsmShops(data);
        setLoading(false);

        // Calculate the average rating
        const totalRating = data.reduce((acc, cur) => acc + (cur.overAllRatting || 0), 0);
        const avgRating = totalRating / data.length;
        setAverageRating(avgRating.toFixed(1)); // Set to 1 decimal place
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Filter data based on search, country, reason of visit, and rating
  const filteredRequests = smshops.filter((v) => {
    const matchesSearch = v.firstName && v.firstName.toLowerCase().includes(search.toLowerCase());
    const matchesCountry = countryFilter ? v.country === countryFilter : true;
    const matchesReasonOfVisit = reasonOfVisitFilter ? v.resonOfVisit === reasonOfVisitFilter : true;
    const matchesRating = ratingFilter ? v.overAllRatting == ratingFilter : true;

    return matchesSearch && matchesCountry && matchesReasonOfVisit && matchesRating;
  });

  // Function to render stars based on the average rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < Math.round(rating) ? 'text-yellow-500' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-between'>
      <PMHeader />
      <div className='relative py-10 px-5'>
        <div className="text-center font-bold text-4xl mb-8 text-gray-800">Feedback Details</div>

        {/* Display Average Rating */}
        <div className="flex justify-center items-center text-xl mb-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-700">Average Over All Rating:</span>
            <span className="text-yellow-500">{renderStars(averageRating)}</span>
            <span className="text-gray-700">({averageRating})</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Filter by Country</label>
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="w-full p-3 border-none rounded-lg neumorphic-input"
            >
              <option value="">All Countries</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="India">India</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Filter by Reason of Visit</label>
            <select
              value={reasonOfVisitFilter}
              onChange={(e) => setReasonOfVisitFilter(e.target.value)}
              className="w-full p-3 border-none rounded-lg neumorphic-input"
            >
              <option value="">All Reasons</option>
              <option value="Vacation">Vacation</option>
              <option value="Wedding">Wedding</option>
              <option value="Business">Business</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Filter by Rating</label>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="w-full p-3 border-none rounded-lg neumorphic-input"
            >
              <option value="">All Ratings</option>
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Great</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>
          </div>
        </div>

        <div className='flex justify-between items-center mb-5'>
          <Link to='/feedBackDetail/create'>
            <AddButton className="neumorphic-button" />
          </Link>
          <SearchBar placeholder={"Enter the first name"} onSearch={setSearch} className="neumorphic-input" />
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className="w-full"> {/* Ensure table takes up full width */}
            <div className="overflow-x-auto"> {/* Keep horizontal scrolling as a fallback */}
              <table className='table-auto min-w-full bg-gray-100 shadow-neumorphic rounded-lg'>
                <thead>
                  <tr className='bg-gray-200 text-xs md:text-sm'>
                    {headers.map((header) => (
                      <th key={header} className='py-2 px-2 text-gray-700'>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((smshop, index) => {
                    const formattedDate = smshop.chickinDate ? format(new Date(smshop.chickinDate), 'MM/dd/yyyy') : '';

                    return (
                      <tr key={smshop._id} className={`h-10 text-center text-xs md:text-sm ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}>
                        <td className='py-2 px-2'>{smshop.firstName}</td>
                        <td className='py-2 px-2'>{smshop.lastName}</td>
                        <td className='py-2 px-2'>{smshop.email}</td>
                        <td className='py-2 px-2'>{smshop.telephone}</td>
                        <td className='py-2 px-2'>{formattedDate}</td>
                        <td className='py-2 px-2'>{smshop.durationOfYouStay}</td>
                        <td className='py-2 px-2'>
                          <div className="flex items-center justify-center">
                            {smshop.country}
                            {smshop.country !== 'Sri Lanka' && (
                              <span className='ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-500 rounded-full'>
                                International
                              </span>
                            )}
                          </div>
                        </td>
                        <td className='py-2 px-2'>{smshop.district}</td>
                        <td className='py-2 px-2'>{smshop.hearAbout}</td>
                        <td className='py-2 px-2'>{smshop.resonOfVisit}</td>
                        <td className='py-2 px-2'>
                          <div className="flex items-center justify-center">
                            {smshop.overAllRatting}
                            {(smshop.overAllRatting === 4 || smshop.overAllRatting === 5) && (
                              <span className='ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-green-500 rounded-full'>
                                {smshop.overAllRatting === 4 ? 'Great!' : 'Excellent!'}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className='py-2 px-2'>{smshop.suggestion}</td>
                        <td className='py-2 px-2'>
                          <div className='flex justify-center gap-x-1'>
                            <Link to={`/feedBackDetail/details/${smshop._id}`}>
                              <ViewButton className="neumorphic-button view-button" />
                            </Link>
                            <Link to={`/feedBackDetail/edit/${smshop._id}`}>
                              <EditButton className="neumorphic-button edit-button" />
                            </Link>
                            <Link to={`/feedBackDetail/delete/${smshop._id}`}>
                              <DeleteButton className="neumorphic-button" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FeedBackDetails;
