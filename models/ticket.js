const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ticketSchema = new Schema({
    seat: {
        type: String,
        match: /[A-F][1-9]\d?$/,
        minlength: 2,
        maxlength: 3,
        required: true,
    },
    price: {type: Number, min: 0, required: true},
    flight: { type: Schema.Types.ObjectId, required: true}
})

module.exports = mongoose.model("Ticket", ticketSchema);