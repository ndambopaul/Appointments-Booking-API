const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    slot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Slot"
    },
    title: String,
    description: String,
    meeting_link: URL,
    session_date: Date,
    created_at: {
        type: Date,
        default: Date.now
    }
});

const StudentsSchema = new mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.model("Booking", BookingSchema);
const Student = mongoose.model("Student", StudentsSchema);

module.exports = {
    Booking,
    Student
}