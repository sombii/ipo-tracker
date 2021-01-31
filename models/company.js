const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema({
    name: {type: String, required: true},
    established: {type: Date}
});

module.exports = mongoose.model("company", CompanySchema);