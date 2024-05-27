const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    username: String,
    email: String,
    phone_number: String,
    password: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", UserSchema);