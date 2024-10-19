const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  email: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  reply: { type: String },
  status: { type: String, enum: ['open', 'in progress', 'resolved'], default: 'open' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', complaintSchema);
