const Booking = require("../models/bookings");
const Slot = require("../models/slots");

const getBookings = async(req, res) => {
    const bookings = await Booking.find({}).populate("creator")
    res.send({count: bookings.length, records: bookings})
};

const createBooking = async(req, res) => {
    const { slot, title, description, session_date } = req.body

    console.log(req.body)

    try {
        const codingSlot = await Slot.findById({ "_id": slot })
        if(!codingSlot) return res.status(404).send({ error: "The slot your are trying to book doesn't exist!" })
        codingSlot.booking_status = "booked"
        await codingSlot.save()
            const booking = new Booking({
            creator: req.user.id,
            title: title,
            slot: slot,
            description: description,
            meeting_link: codingSlot.meeting_link,
            session_date: session_date
        });
        await booking.save()

        if (!booking) return res.status(400).send({ error: "Something went wrong, booking could not be created!!" })
        

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
        res.send(booking).status(200)
    } catch (error) {
        console.log({ error: error.message });
        return res.status(500).send({ error: error.message })
    }
};

const updateBooking = async(req, res) => {
    const { body, params: { id } } = req

    try {
        const booking = await Booking.findByIdAndUpdate(id, { ...body }, { new: true });
        if(!booking) return res.status(404).send({ error: `Booking with id: ${id} not found!!` })
        res.send({ booking }).status(200)
    } catch (error) {
        console.log({ error: error.message });
        return res.status(500).send({ error: error.message })
    }
}

const deleteBooking  = async(req, res) => {
    const { id } = req.params;

    try {
        const booking = await Booking.findByIdAndDelete(id)
        if(!booking) return res.status(404).send({ error: `Booking with id: ${id} not found!!` })
        res.send({ message: `Booking with id: ${id} deleted successfully` })
    } catch (error) {
        console.log({ error: error.message });
        return res.status(500).send({ error: error.message })
    }
}

module.exports = {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
}