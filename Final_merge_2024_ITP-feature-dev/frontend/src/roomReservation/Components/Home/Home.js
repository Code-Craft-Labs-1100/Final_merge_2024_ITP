import React, { useState,useEffect } from "react";
import "./Home.css";
import Beach from "../Home/Beach.mp4";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";

function Home() {
  const [guests, setGuests] = useState({ adults: 0, children: 0 });
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(""); 
  
  useEffect(() => {
    if (location.state?.isEditing) {
        const { guests, checkin, checkout, promocode, _id } = location.state;
        setGuests(guests);
        setCheckInDate(checkin);
        setCheckOutDate(checkout);
        setPromoCode(promocode || "");
        setIsEditing(true);
        setBookingId(_id);
    }
  }, [location]);
  

  const handleDateChange = (setter) => (e) => {
    const dateValue = e.target.value;
    setter(dateValue.split('T')[0]);  // This will store only the date part
  };



  const handleGuestChange = (type, value) => {
    setGuests((prevGuests) => ({
      ...prevGuests,
      [type]: Math.max(0, prevGuests[type] + value),
    }));
  };

  const calculateDateDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return dayDifference;
  };

  const handleBookNow = async () => {

    const numberOfDays = calculateDateDifference(checkInDate, checkOutDate);

    if (numberOfDays <= 0) {
      alert("Check-out date must be after check-in date");
      return;
    }


    const bookingDetails = {
      guests: {
        adults: guests.adults,
        children: guests.children,
      },
      checkin: checkInDate,
      checkout: checkOutDate,
      promocode: promoCode || null,
      country: selectedCountry || null,
      numberOfDays
    };
    navigate("/accomodation", {
      state: {
        ...bookingDetails
      }
    });
  };


  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "India",
    "Japan",
    "China",
    "Brazil",
    // Add more countries as needed
  ];



  return (
    <div>
      <div className="video-container">
        <video src={Beach} controls autoPlay muted loop className="video" />
        <div className="input-overlay">
          <div className="row align-items-center">
            <div className="col-2 custom-col">
              <label htmlFor="checkin">Check-in:</label>
              <input
                type="date"
                id="checkin"
                className="form-control"
                value={checkInDate}
                onChange={handleDateChange(setCheckInDate)}
              />
            </div>
            <div className="col-2">
              <label htmlFor="checkout">Check-out:</label>
              <input
                type="date"
                id="checkout"
                className="form-control"
                value={checkOutDate}
                onChange={handleDateChange(setCheckOutDate)}
              />
            </div>
            <div className="col-4">
              <label htmlFor="guests">Guests:</label>
              <div className="input-group">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => handleGuestChange("adults", -1)}
                  disabled={guests.adults === 0}
                >
                  -
                </button>
                <input
                  type="text"
                  className="form-control"
                  value={`${guests.adults} Adults`}
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => handleGuestChange("adults", 1)}
                >
                  +
                </button>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => handleGuestChange("children", -1)}
                  disabled={guests.children === 0}
                >
                  -
                </button>
                <input
                  type="text"
                  className="form-control"
                  value={`${guests.children} Children`}
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => handleGuestChange("children", 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="col">
              <label htmlFor="promoCode">Promo Code:</label>
              <input
                type="text"
                id="promoCode"
                className="form-control"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
            </div>

            <div className="col">
              <label htmlFor="country">Country:</label>
              <select
                id="country"
                className="form-control"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="">Select Country</option> {/* Placeholder option */}
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>



            <div className="col-auto">
              <button className="btn btn-primary booknow" onClick={handleBookNow}>
              {isEditing ? "Update Booking" : "Book Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;