const Booking = require("../models/bookings");

const getBookings = async(req, res) => {
    const bookings = await Booking.find({})
    res.send({count: bookings.length, records: bookings})
};

const createBooking = async(req, res) => {
    const { slot, title, description, meeting_link, session_date } = req.body

    try {
        const booking = new Booking({
            creator: req.user.id,
            title: title,
            slot: slot,
            description: description,
            meeting_link: meeting_link,
            session_date: session_date
        });
        await booking.save()

        if(!booking) return res.status(400).send({ error: "Booking could not be created" })
        res.send({ booking }).status(201)
    } catch (error) {
        console.log({ error: error.message });
        return res.status(500).send({ error: error.message })
    }
}

const getBookingById = async(req, res) => {
    const { id } = req.params

    try {
        const booking = await Booking.findById({"_id": id})
        if(!booking) return res.status(404).send({ error: `Booking with id: ${id} not found` })
        res.send({ booking }).status(200)
    } catch (error) {
        console.log({ error: error.message });
        return res.status(500).send({ error: error.message })
    }
}

module.exports = {
    getBookings,
    getBookingById,
    createBooking
}