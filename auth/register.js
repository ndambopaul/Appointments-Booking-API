const bcrypt = require("bcryptjs");
const User = require("../models/users");

const register = async(req, res) => {
    const data = req.body

    try {
        const existingUser = await User.findOne({ "email": data.email });
        if(existingUser) return res.status(400).send({ error: `User with email: ${data.email} already exists!` })
        
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = new User({
            first_name: data.first_name,
            last_name: data.last_name,
            username: data.username,
            email: data.email,
            phone_number: data.phone_number,
            password: hashedPassword
        });
        await newUser.save()

        if(!newUser) return res.status(400).send({ error: "User could not be created!!" })
        return res.send({ message: `User with email: ${data.email} successfully created` }).status(201) 
        
    } catch (error) {
        console.log({ error: error.message });
        return res.status(500).send({ error: error.message })
    }
}

module.exports = {
    register
}