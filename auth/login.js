const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const login = async(req, res) => {
    const { email, password } = req.body;

    console.log({ email: email, password: password })

    try {
        const user = await User.findOne({ "email": email });
        if(!user) return res.status(404).send({ error: `User with email: ${email} not found!!` })
        
        const passwordMatches = await bcrypt.compare(password, user.password);
        if(!passwordMatches) return res.status(400).send({ error: "Incorrect Password!!" });

        const token = await jwt.sign({ user: { id: user.id, email: user.email, username: user.username, first_name: user.first_name, last_name: user.last_name, phone_number: user.phone_number } }, "1234", {expiresIn: "1h"})
        res.send({ token }).status(200)

    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error.message })
    }
}

module.exports = {
    login
}