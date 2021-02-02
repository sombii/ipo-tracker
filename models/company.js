const mongoose = require("mongoose");
const {DateTime} = require("luxon");

const CompanySchema = mongoose.Schema({
    name: {type: String, required: true},
    established: {type: Date, default: Date.now}
});

CompanySchema.virtual("established_formatted")
    .get(function () {
        return DateTime.fromJSDate((this.established)).toLocaleString(DateTime.DATE_MED);
    })

module.exports = mongoose.model("Company", CompanySchema, "company");