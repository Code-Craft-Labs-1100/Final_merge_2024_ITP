import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  FaArrowLeft,
  FaCreditCard,
  FaTrash,
  FaEdit,
  FaDownload,
} from "react-icons/fa";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./CheckOut.css";
import visa from "../CheckOut/visa.jpg";
import logoData from "../CheckOut/valampuri.png";

// Initialize Stripe
const stripePromise = loadStripe("your_stripe_publishable_key");

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
}

function CheckoutForm({
  accomodationDetails,
  formData,
  setFormData,
  finalTotalPrice,
  onSuccess,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage("");

    try {
      // Create PaymentIntent
      const paymentIntentResponse = await axios.post(
        "http://localhost:5000/create-payment-intent",
        {
          amount: Math.round(finalTotalPrice * 100),
          currency: "usd",
        }
      );

      const { clientSecret } = paymentIntentResponse.data;

      // Confirm the payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.emailAddress,
          },
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        // Save the booking
        const bookingData = {
          ...accomodationDetails,
          paymentIntentId: result.paymentIntent.id,
          ...formData,
        };

        const response = await axios.post(
          "http://localhost:5000/users",
          bookingData
        );

        if (response.status === 201) {
          onSuccess();
        } else {
          setErrorMessage(
            "Payment processed but booking failed. Please contact support."
          );
        }
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Contact Info */}
      <h2>Contact Info</h2>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="mobilePhone">Mobile phone *</label>
          <input
            type="tel"
            id="mobilePhone"
            name="mobilePhone"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailAddress">Email Address *</label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            required
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Address */}
      <h2>Address</h2>
      <div className="form-group">
        <label htmlFor="country">Country *</label>
        <select
          id="country"
          name="country"
          required
          onChange={handleInputChange}
        >
          <option value="">Select a country</option>
          {[
            "United States",
            "Canada",
            "United Kingdom",
            "Australia",
            "Germany",
          ].map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="address1">Address 1 *</label>
        <input
          type="text"
          id="address1"
          name="address1"
          required
          onChange={handleInputChange}
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="city">City *</label>
          <input
            type="text"
            id="city"
            name="city"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="zipCode">Zip / Postal Code *</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            required
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Payment */}
      <h2>Payment</h2>
      <div className="card-types">
        <img src={visa} alt="Visa" className="h-8" />
      </div>
      <div className="form-group">
        <label htmlFor="card-element">Credit or debit card</label>
        <CardElement id="card-element" />
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <button type="submit" disabled={isProcessing} className="confirm-booking">
        {isProcessing ? "Processing..." : "Confirm Booking"}
      </button>
    </form>
  );
}

function CheckOut() {
  const location = useLocation();
  const navigate = useNavigate();
  const accomodationDetails = location.state;

  const taxAmount = (accomodationDetails.totalPrice * 0.23).toFixed(2);
  const finalTotalPrice = (
    parseFloat(accomodationDetails.totalPrice) + parseFloat(taxAmount)
  ).toFixed(2);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobilePhone: "",
    emailAddress: "",
    country: "",
    address1: "",
    city: "",
    zipCode: "",
    specialRequests: "",
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    navigate("/accomodation", {
      state: {
        checkin: accomodationDetails.checkin,
        checkout: accomodationDetails.checkout,
        id: accomodationDetails.id,
        guests: accomodationDetails.guests,
        country: accomodationDetails.country,
        roomType: accomodationDetails.roomType,
        roomPrice: accomodationDetails.roomPrice,
      },
    });
  };

  const handleRemove = async () => {
    if (accomodationDetails._id) {
      try {
        await axios.delete(
          `http://localhost:5000/users/${accomodationDetails._id}`
        );
        alert("Booking removed successfully!");
        navigate("/");
      } catch (error) {
        console.error("Error removing booking:", error);
        alert("There was an error removing your booking. Please try again.");
      }
    } else {
      alert("Booking removed from cart.");
      navigate("/");
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add hotel logo
    doc.addImage(logoData, "PNG", 10, 10, 50, 20);

    // Set font and colors
    doc.setFont("helvetica", "bold");
    doc.setTextColor(44, 62, 80);

    // Add title
    doc.setFontSize(22);
    doc.text("Billing Summary", 105, 40, null, null, "center");

    // Add booking details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Room Type: ${accomodationDetails.roomType}`, 20, 60);
    doc.text(`Check-in: ${formatDate(accomodationDetails.checkin)}`, 20, 70);
    doc.text(`Check-out: ${formatDate(accomodationDetails.checkout)}`, 20, 80);
    doc.text(
      `Guests: ${accomodationDetails.guests?.adults || 0} Adults, ${
        accomodationDetails.guests?.children || 0
      } Children`,
      20,
      90
    );
    doc.text(`Total Price: $${finalTotalPrice}`, 20, 100);

    doc.save("billing_summary.pdf");
  };

  const handleBookingSuccess = () => {
    alert("Booking confirmed and payment processed successfully!");
    navigate("/");
  };

  return (
    <div className="checkout-container">
      <div className="booking-summary">
        <h2>Your Cart</h2>
        <p className="total-price">Total ${finalTotalPrice}</p>
        <p>Including taxes and fees</p>
        <div className="booking-details">
          <p>
            <strong>Room Type:</strong> {accomodationDetails.roomType}
          </p>
          <p>
            <strong>Room Price:</strong> ${accomodationDetails.roomPrice} per
            night
          </p>
          <p>
            <strong>Check-in Date:</strong>{" "}
            {formatDate(accomodationDetails.checkin)}
          </p>
          <p>
            <strong>Check-out Date:</strong>{" "}
            {formatDate(accomodationDetails.checkout)}
          </p>
          <p>
            <strong>Taxes and Fees:</strong> ${taxAmount}
          </p>
          <p>
            <strong>Number of Guests:</strong>{" "}
            {accomodationDetails.guests?.adults || 0} Adults,{" "}
            {accomodationDetails.guests?.children || 0} Children
          </p>
          {accomodationDetails.promocode && (
            <p>
              <strong>Promo Code:</strong> {accomodationDetails.promocode}
            </p>
          )}
          <p>
            <strong>Country:</strong> {accomodationDetails.country}
          </p>
          <button onClick={handleEdit} className="edit-button">
            <FaEdit />
            Edit
          </button>
          <button onClick={handleRemove} className="remove-button">
            <FaTrash />
            Remove
          </button>
        </div>
      </div>

      <div className="checkout-form">
        <div className="checkout-header">
          <button onClick={handleBack} className="back-button">
            <FaArrowLeft /> Back
          </button>
        </div>
        <h1 className="checkouth">Check Out</h1>

        <Elements stripe={stripePromise}>
          <CheckoutForm
            accomodationDetails={accomodationDetails}
            formData={formData}
            setFormData={setFormData}
            finalTotalPrice={finalTotalPrice}
            onSuccess={handleBookingSuccess}
          />
        </Elements>

        <div className="policies-acknowledgement">
          <h2>Policies</h2>
          <div className="policy-item">
            <h3>Check-in</h3>
            <p>after 2:00 pm</p>
          </div>
          <div className="policy-item">
            <h3>Check-out</h3>
            <p>before 12:00 pm</p>
          </div>
          <div className="policy-item">
            <h3>Cancellation Policy</h3>
            <p>
              Free cancellation up to 24 hours before check-in. Cancellations
              within 24 hours of check-in may incur a fee.
            </p>
          </div>
        </div>

        <button onClick={handleDownloadPDF} className="download-button">
          <FaDownload /> Download Billing Summary
        </button>
      </div>
    </div>
  );
}

export default CheckOut;
