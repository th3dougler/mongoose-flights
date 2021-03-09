const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Ticket = require("./ticket")

const destinationSchema = new Schema({
  airport: {
    type: String,
    enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
  },
  arrival: { type: Date },
});

const flightSchema = new Schema(
  {
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
    destinations: [destinationSchema],
    tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Flight", flightSchema);
