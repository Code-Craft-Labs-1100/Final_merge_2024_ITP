import React from "react";
import { useState, useEffect } from "react";
import beachHotelImage from "../Accomodation/BeachHotels.jpg";
import "./Accomodation.css";
import home from "../Accomodation/Home.svg";
import telephone from "../Accomodation/telephone2.svg";
import luxuryRooms from "../Accomodation/King Bed1.jpg";
import air from "../Accomodation/AirConditioning.png";
import wifi from "../Accomodation/Wifi.png";
import TeaCup from "../Accomodation/teacup.svg";
import TeaCup2 from "../Accomodation/teacup2.svg";
import { useLocation, useNavigate } from "react-router-dom";
import twinBed from "../Accomodation/TwinBed.jpg";
import axios from "axios";

function Accomodation() {
  const location = useLocation();
  // Retrieve the state passed from Home
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(location.state || {});

  const [adults, setAdults] = useState(bookingDetails.guests?.adults || 1);
  const [children, setChildren] = useState(
    bookingDetails.guests?.children || 0
  );
  const [checkin, setCheckin] = useState(bookingDetails.checkin || "");
  const [checkout, setCheckout] = useState(bookingDetails.checkout || "");
  const [country, setCountry] = useState(bookingDetails.country || "");
  const [numberOfDays, setNumberOfDays] = useState(1);

  const calculateDateDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return dayDifference;
  };

  useEffect(() => {
    // Update numberOfDays whenever checkin or checkout changes
    if (checkin && checkout) {
      const days = calculateDateDifference(checkin, checkout);
      setNumberOfDays(days);
    }
  }, [checkin, checkout]);

  useEffect(() => {
    setBookingDetails((prev) => ({
      ...prev,
      guests: { adults, children },
      checkin,
      checkout,
      country,
      numberOfDays,
    }));
  }, [adults, children, checkin, checkout, country, numberOfDays]);

  const handleAdultsChange = (change) => {
    setAdults((prev) => Math.max(1, prev + change));
  };

  const handleChildrenChange = (change) => {
    setChildren((prev) => Math.max(0, prev + change));
  };

  // Handler for updating dates
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "checkin") setCheckin(value);
    if (name === "checkout") setCheckout(value);
  };

  // Handler for updating country
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };
  const handleSave = async () => {
    try {
      const updatedBookingDetails = {
        ...bookingDetails,
        guests: { adults, children },
        checkin: new Date(checkin).toISOString(), // Convert to ISO string
        checkout: new Date(checkout).toISOString(), // Convert to ISO string
        country,
        numberOfDays,
      };

      const response = await axios.put(
        `http://localhost:5000/users/${bookingDetails.id}`,
        updatedBookingDetails
      );
      if (response.status === 200) {
        alert("Booking details updated successfully!");
        setBookingDetails(response.data);
        navigate("/checkout", {
          state: {
            ...response.data,
            roomType: bookingDetails.roomType,
            roomPrice: bookingDetails.roomPrice,
            totalPrice: bookingDetails.roomPrice * numberOfDays,
            checkin: updatedBookingDetails.checkin, // Ensure these are passed
            checkout: updatedBookingDetails.checkout,
            guests: updatedBookingDetails.guests,
            country: updatedBookingDetails.country,
          },
        });
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("There was an error updating your booking. Please try again.");
    }
  };

  const [selectedLuxuryRoom, setSelectedLuxuryRoom] = useState({
    type: "Luxury Sea Front King Room",
    image: luxuryRooms,
    price: 150,
    description3: "1 King Bed",
    description4:
      "Our Luxury Sea View King Room delights you with terrific views and elegant interiors",
  });

  const [selectedSuiteRoom, setSelectedSuiteRoom] = useState({
    type: "Premium Suite Ocean View",
    image: luxuryRooms,
    price: 300,
    description3: "1 King Bed",
    description4:
      "Our Premium Suite offers a unique retreat amidst lush greenery and the sea.",
  });

  const [selectedPremiumRoom, setSelectedPremiumRoom] = useState({
    type: "Premium Pool Access King Room",
    image: luxuryRooms,
    price: 162,
    description3: "1 King Bed",
    description4:
      "Our Premium Pool Access King room welcomes you to premium views and comfort.",
  });

  if (!bookingDetails) {
    return <div>No booking details available.</div>;
  }

  // Function to handle room selection
  const handleLuxuryRoomSelection = (roomType) => {
    if (roomType === "king") {
      setSelectedLuxuryRoom({
        type: "Luxury Sea Front King Room",
        image: luxuryRooms,
        price: 150,
        description3: "1 King Bed",
        description4:
          "Our Luxury Sea View King Room delights you with terrific views and elegant interiors",
      });
    } else if (roomType === "twin") {
      setSelectedLuxuryRoom({
        type: "Luxury Sea Front Twin Room",
        image: twinBed,
        price: 180,
        description3: "Twin Beds",
        description4:
          "Our Luxury Sea View Twin Room offers a comfortable stay with twin beds and scenic views.",
      });
    }
  };

  const handleSuiteRoomSelection = (roomType) => {
    if (roomType === "premium") {
      setSelectedSuiteRoom({
        type: "Premium Suite Ocean View",
        image: luxuryRooms,
        price: 300,
        description3: "1 King Bed",
        description4:
          "Our Premium Suite offers a unique retreat amidst lush greenery and the sea.",
      });
    } else if (roomType === "deluxe") {
      setSelectedSuiteRoom({
        type: "Deluxe Suite Ocean View",
        image: twinBed,
        price: 350,
        description3: "1 King Bed",
        description4:
          "Our Deluxe Suite offers top-tier luxury with breathtaking ocean views.",
      });
    }
  };

  const handlePremiumRoomSelection = (roomType) => {
    if (roomType === "king") {
      setSelectedPremiumRoom({
        type: "Premium Pool Access King Room",
        image: luxuryRooms,
        price: 162,
        description3: "1 King Bed",
        description4:
          "Our Premium Pool Access King room welcomes you to premium views and comfort.",
      });
    } else if (roomType === "twin") {
      setSelectedPremiumRoom({
        type: "Premium Pool Access Twin Room",
        image: twinBed,
        price: 170,
        description3: "Twin Beds",
        description4:
          "Our Premium Pool Access Twin Room is perfect for a comfortable stay with premium amenities.",
      });
    }
  };

  const handleBookNow = async (roomType, roomPrice) => {
    const totalPrice = roomPrice * bookingDetails.numberOfDays;

    const checkoutDetails = {
      ...bookingDetails,
      roomType,
      roomPrice,
      totalPrice,
      checkin: checkin ? new Date(checkin).toISOString() : null,
      checkout: checkout ? new Date(checkout).toISOString() : null,
      guests: { adults, children },
      country: country || "",
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/users",
        checkoutDetails
      );
      if (response.status === 201) {
        alert("Booking confirmed!");
        navigate("/checkout", { state: response.data.user });
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("There was an error confirming your booking. Please try again.");
    }
  };

  return (
    <div>
      <img
        src={beachHotelImage}
        alt="BeachHotel"
        className="accomodation-image"
      ></img>
      <div className="About">
        <h2>Valampuri Hotel</h2>
        <p>
          <b>Check-in Date: {checkin}</b>
        </p>
        <p>
          <b>Check-out Date: {checkout}</b>
        </p>
        <p>
          <b>Adults: {adults}</b>
        </p>
        <p>
          <b>Children: {children}</b>
        </p>
        <p>
          <b>Country:{country}</b>
        </p>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className="address-container">
          <img src={home} alt="Home Icon" className="home-icon" />
          <p className="address-text">23/4,Chattem Street, Jaffna</p>
        </div>
        <div className="telephone-container">
          <img
            src={telephone}
            alt="Telephone Icon"
            className="telephone-icon"
          />
          <p className="telephone-text">011-2354678</p>
        </div>
      </div>

      <div className="booking-details-editor">
        <h3>Edit Booking Details</h3>
        <div>
          <label>Adults: </label>
          <button onClick={() => handleAdultsChange(-1)}>-</button>
          <span>{adults}</span>
          <button onClick={() => handleAdultsChange(1)}>+</button>
        </div>
        <div>
          <label>Children: </label>
          <button onClick={() => handleChildrenChange(-1)}>-</button>
          <span>{children}</span>
          <button onClick={() => handleChildrenChange(1)}>+</button>
        </div>
        <div>
          <label>Check-in: </label>
          <input
            type="date"
            name="checkin"
            value={checkin}
            onChange={handleDateChange}
          />
        </div>
        <div>
          <label>Check-out: </label>
          <input
            type="date"
            name="checkout"
            value={checkout}
            onChange={handleDateChange}
          />
        </div>
        <div>
          <label>Country: </label>
          <input type="text" value={country} onChange={handleCountryChange} />
        </div>
        <button onClick={handleSave} className="save-button">
          Save
        </button>
      </div>

      <h2>Select a Room</h2>

      <div className="Rooms">
        <div className="LuxuryRooms">
          <div className="luxuryRoom-container">
            <img
              src={selectedLuxuryRoom.image}
              alt="Luxury Rooms"
              className="luxuryRooms-icon"
            ></img>
            <h2 className="Room-title">{selectedLuxuryRoom.type}</h2>
            <div className="button">
              <button
                className="room-button"
                onClick={() => handleLuxuryRoomSelection("king")}
              >
                Luxury Sea Front King Room
              </button>
              <button
                className="room-button2"
                onClick={() => handleLuxuryRoomSelection("twin")}
              >
                Luxury Sea Front Twin Room
              </button>
              <p className="Description">Sleeps 3</p>
              <p className="Description2">|</p>
              <p className="Description3">{selectedLuxuryRoom.description3}</p>
              <p className="Description4">{selectedLuxuryRoom.description4}.</p>
              <hr className="description-divider" />
              <p className="Description5">Bed Breakfast &Basis</p>
              <p className="Description6">
                <b>${selectedLuxuryRoom.price}</b>
              </p>
              <br></br>
              <img
                src={TeaCup2}
                alt="teacup-icon"
                className="Teacupimage2"
              ></img>
              <p className="Description7">BreakFast Included</p>
              <p className="Description8">Per Night</p>
              <p className="Description9">International Breakfast Included.</p>
              <button
                className="Room-booking"
                onClick={() =>
                  handleBookNow(
                    selectedLuxuryRoom.type,
                    selectedLuxuryRoom.price
                  )
                }
              >
                Book Now
              </button>
            </div>
          </div>

          <div className="Aircondition-container">
            <img
              src={air}
              alt="Air Conditioning"
              className="airConditioning-icon"
            ></img>
            <p className="air-text">Air Conditioning</p>
          </div>

          <div className="Wifi-container">
            <img src={wifi} alt="Wifi" className="Wifi-icon"></img>
            <p className="Wifi-text">Wifi</p>
          </div>

          <br></br>
        </div>

        <div className="SuiteRooms">
          <div className="luxuryRoom-container">
            <img
              src={selectedSuiteRoom.image}
              alt="Luxury Rooms"
              className="luxuryRooms-icon"
            ></img>
            <h2 className="Room-title">Suites</h2>
            <div className="button">
              <button
                className="room-button"
                onClick={() => handleSuiteRoomSelection("premium")}
              >
                Premium Suite Ocean View
              </button>
              <button
                className="room-button2"
                onClick={() => handleSuiteRoomSelection("deluxe")}
              >
                Deluxue Suite Ocean View
              </button>
              <p className="Description">Sleeps 3</p>
              <p className="Description2">|</p>
              <p className="Description3">{selectedSuiteRoom.description3}</p>
              <p className="Description4">{selectedSuiteRoom.description4}</p>
              <hr className="description-divider" />
              <p className="Description5">Bed Breakfast &Basis</p>
              <p className="Description6">
                <b>${selectedSuiteRoom.price}</b>
              </p>
              <br></br>
              <img
                src={TeaCup2}
                alt="teacup-icon"
                className="Teacupimage2"
              ></img>
              <p className="Description7">BreakFast Included</p>
              <p className="Description8">Per Night</p>
              <p className="Description9">International Breakfast Included.</p>
              <button
                className="Room-booking"
                onClick={() =>
                  handleBookNow(selectedSuiteRoom.type, selectedSuiteRoom.price)
                }
              >
                Book Now
              </button>
            </div>
          </div>

          <div className="Aircondition-container">
            <img
              src={air}
              alt="Air Conditioning"
              className="airConditioning-icon"
            ></img>
            <p className="air-text">Air Conditioning</p>
          </div>

          <div className="Wifi-container">
            <img src={wifi} alt="Wifi" className="Wifi-icon"></img>
            <p className="Wifi-text">Wifi</p>
          </div>

          <br></br>
        </div>

        <div className="PremiumRooms">
          <div className="luxuryRoom-container">
            <img
              src={selectedPremiumRoom.image}
              alt="Luxury Rooms"
              className="luxuryRooms-icon"
            ></img>
            <h2 className="Room-title">Premium Luxury Rooms</h2>
            <div className="button">
              <button
                className="room-button"
                onClick={() => handlePremiumRoomSelection("king")}
              >
                Premium Pool Acess King Room
              </button>
              <button
                className="room-button2"
                onClick={() => handlePremiumRoomSelection("twin")}
              >
                Premium Pool Acess Twin Room
              </button>
              <p className="Description">Sleeps 3</p>
              <p className="Description2">|</p>
              <p className="Description3">{selectedPremiumRoom.description3}</p>
              <p className="Description4">{selectedPremiumRoom.description4}</p>
              <hr className="description-divider" />
              <p className="Description5">Bed Breakfast &Basis</p>
              <p className="Description6">
                <b>${selectedPremiumRoom.price}</b>
              </p>
              <br></br>
              <img
                src={TeaCup2}
                alt="teacup-icon"
                className="Teacupimage2"
              ></img>
              <p className="Description7">BreakFast Included</p>
              <p className="Description8">Per Night</p>
              <p className="Description9">International Breakfast Included.</p>
              <button
                className="Room-booking"
                onClick={() =>
                  handleBookNow(
                    selectedPremiumRoom.type,
                    selectedPremiumRoom.price
                  )
                }
              >
                Book Now
              </button>
            </div>
          </div>

          <div className="Aircondition-container">
            <img
              src={air}
              alt="Air Conditioning"
              className="airConditioning-icon"
            ></img>
            <p className="air-text">Air Conditioning</p>
          </div>

          <div className="Wifi-container">
            <img src={wifi} alt="Wifi" className="Wifi-icon"></img>
            <p className="Wifi-text">Wifi</p>
          </div>

          <br></br>
        </div>
      </div>
    </div>
  );
}

export default Accomodation;
