const express = require("express")
const { getBookings, getBookingById, createBooking } = require("../controllers/bookings");

const router = express.Router();

router.get("/", getBookings);
router.get("/:id", getBookingById);
router.post("/", createBooking);

module.exports = router