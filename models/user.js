
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    userName: {type: String, required: true},
    password: {type: String, required: true, min: 8}
});


module.exports = mongoose.model("User", UserSchema, "user");

