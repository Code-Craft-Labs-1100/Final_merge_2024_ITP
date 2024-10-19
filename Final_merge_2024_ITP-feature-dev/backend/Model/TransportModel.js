const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//expence category model
const transportCategoriesModel = new Schema({
  vehicletype: { type: String, default: "Anonymous" },
  color: { type: String, default: "#FCBE44" }
});

// Define the schema for the Technical model
const transportSchema = new Schema({
  customername: {
    type: String,
    required: true
  },
  vehicletype: { type: String, default: "Anonymous" },

  rentdate: {
    type: String,
    required: true
  },

  claimdate: {
    type: String,
    required: true
  },
  rentprice: {
    type: Number,
    required: true
  }
});

// Create and export the model
const Transports = mongoose.model("Transport", transportSchema);
const TransportCategories = mongoose.model(
  "transportCategoriesModel",
  transportCategoriesModel,
  "transportCategoriesModel" // This will force the collection to use the exact name
);

exports.default = Transports;
exports.default = TransportCategories;

module.exports = {
  Transports,
  TransportCategories
};
