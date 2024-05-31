const Student = require("../models/students");
const Booking = require("../models/bookings");

const getStudentsInSession = async(req, res) => {
    const { id } = req.params

    try {
        const students = await Student.find({ "booking": id }).populate("user");
        res.send({ count: students.length, records: students });
    } catch (error) {
        console.log({ error: error.message });
        return res.status(500).send({ error: error.message })
    }
}

const joinSession = async(req, res) => {
    try {
        const booking = await Booking.findById({"_id": req.params.id});
        if(!booking) return res.status(404).send({ error: `No booked session with id: ${req.params.id} found!!` })
        const session = new Student({
            user: req.user.id,
            booking: booking._id
        });
        await session.save();
        if(!session) return res.status(400).send({ error: "Something went wrong, could not join session!!" })
        res.send({ session }).status(201)
    } catch (error) {
        console.log({ error: error.message });
        return res.status(500).send({ error: error.message })
    }
}

const leaveSession = async(req, res) => {
    try {
        console.log({ id: req.params.id })
        const session = await Student.findOne({"booking": req.params.id});
        if(!session) return res.status(404).send({ error: "You cannot leave a session which you didn't join!!" });
        await session.deleteOne()
        res.send({ message: `Session record with id: ${req.params.id} has been removed` }).status(200)
    } catch (error) {
        console.log({ error: error.message });
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
    getStudentsInSession,
    joinSession,
    leaveSession
}