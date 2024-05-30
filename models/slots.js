const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, 
    day_name: String,
    start_time: {
        type: String,
        enum: ["7:00 AM", "3:00 PM", "8:00 PM"]
    },
    end_time: {
        type: String,
        enum: ["9:00 AM", "5:00 PM", "10:00 PM"]
    },
    meeting_link: String,
    booking_status: {
        type: String,
        enum: ["available", "booked"],
        default: "available"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Slot", SlotSchema);
