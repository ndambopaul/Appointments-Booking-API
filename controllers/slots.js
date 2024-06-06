const Slot = require("../models/slots");

const getSlots = async(req, res) => {
    const slots = await Slot.find({}).populate("creator")
    res.send({ count: slots.length, records: slots }).status(200)
};

const createSlot = async(req, res) => {
    const body = req.body
    try {
        const slot = new Slot({
            creator: req.user.id,
            day_name: body.day_name,
            start_time: body.start_time,
            end_time: body.end_time,
            meeting_link: body.meeting_link,
            booking_status: "available"
        });
        await slot.save()
        if(!slot) return res.status(400).send({ error: "Slot could not be created!!" })
        res.send({ slot }).status(201)
    } catch (error) {
        console.log({ error: error.message });
        return res.status(500).send({ error: error.message })
    }
    
};

const getSlotById = async(req, res) => {
    const { id } = req.params

    try {
        const slot = await Slot.findById({ "_id": id }).populate("creator")
        if(!slot) return res.status(404).send({ error: `Slot with id: ${id} not found` })
        res.send({ slot }).status(200)
    } catch (error) {
        console.log({ error: error.message });
        return res.status(500).send({ error: error.message })
    }
}

const updateSlot = async(req, res) => {
    const { body, params: { id } } = req

    try {
        const slot = await Slot.findByIdAndUpdate(id, { ...body }, { new: true })
        if(!slot) return res.status(404).send({ error: `Slot with id: ${id} not found!!` })
        res.send({ slot }).status(200)
    } catch (error) {
        console.log({ error: error.message });
        return res.status(500).send({ error: error.message })
    }
}

const deleteSlot = async(req, res) => {
    try {
        const slot = await Slot.findByIdAndDelete(req.params.id);
        if(!slot) return res.status(404).send({ error: `Slot with id: ${id} not found!!` })
        res.send({ message: 'Slot deleted successfully' }).status(204)
    } catch (error) {
        console.log({ error: error.message });
        return res.status(500).send({ error: error.message })
    }
}

module.exports = {
    getSlots,
    getSlotById,
    createSlot,
    updateSlot,
    deleteSlot
}