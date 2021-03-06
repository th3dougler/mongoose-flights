const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ["American", "Southwest", "United"],
  },
  airport: {
    type: String,
    enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
    default: "DEN",
  },
  flightNo: {
    type: Number,
    required: [true, "Flight No. Required"],
    min: 10,
    max: 9999,
  },
  departs: {
    type: Date,
    default: () => {
      let now = new Date();
      return new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
    },
  },
});

module.exports = mongoose.model("Flight", flightSchema);