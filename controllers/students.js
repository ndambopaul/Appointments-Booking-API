const Student = require("../models/students");

const getStudentSessions = async(req, res) => {
    const sessions = await Student.find({ "user": req.user.id });

    res.send(sessions).status(200)
}

module.exports = {
    getStudentSessions
}