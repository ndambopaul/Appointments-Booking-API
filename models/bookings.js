const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    slot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Slot"
    },
    title: String,
    description: String,
    meeting_link: String,
    session_date: Date,
    created_at: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("Booking", BookingSchema)