const User = require("../models/users");

const getUsers = async(req, res) => {
    const users = await User.find({})
    res.send({count: users.length, records: users})
}

module.exports = {
    getUsers
}