const express = require('express');
const router = express.Router();
const Complaint = require('../Model/complaintsModel'); // Make sure your model has a 'reply' field
const nodemailer = require('nodemailer'); // Import nodemailer for sending emails

// Configure the transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service
  auth: {
    user: 'samanworldcafe@gmail.com', // Your email
    pass: 'vwgx hjuj behy bbxc', // Your email password (preferably use environment variables)
  },
});

// Create a complaint
router.post('/', async (req, res) => {
  try {
    const newComplaint = new Complaint(req.body);
    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get complaint details by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a complaint by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await Complaint.findByIdAndDelete(id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update complaint status by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(id, { status }, { new: true });
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reply to a complaint by ID
router.post('/reply/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    // Fetch the complaint to get the user's email
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Update the complaint with the reply
    complaint.reply = reply; // Assuming your model has a reply field
    await complaint.save();

    // Send the reply via email
    const mailOptions = {
      from: transporter.options.auth.user, // Sender email
      to: complaint.email, // User's email from the complaint
      subject: 'Reply to Your Complaint',
      text: `Thank you for your complaint. Here is our reply:\n\n${reply}`, // Include the reply message
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email' });
      }
      res.json({ message: 'Reply sent successfully', complaint });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
