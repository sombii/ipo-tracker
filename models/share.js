const mongoose = require("mongoose");

const ShareSchema = mongoose.Schema({
    company: {type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true},
    issue_name: {type: String},
    issue_opening_date: {type: Date, required: true, default: "N/A"},
    issue_closing_date: {type: Date, required: true, default: "N/A"},
    issue_last_closing_date: {type: Date, required: true, default: "N/A"},
    issue_manager: {type: String, required: true},
    issue_type: {type: String, enum: ["IPO", "FPO", "RESERVED (RIGHT SHARE)"], required: true},
    issued_unit: {type: Number, required: true},
    min_unit: {type: Number, required: true},
    listing_date: {type: Date,},
    per_unit: {type: Number, required: true},
    ratio: {type: String, required: true},
    scrip: {type: String, required: true},
    sector: {type: String, required: true},
    share_type: {type: String, enum: ["Ordinary Shares", "Debentures", "Mutual Funds"]},
    status: {type: String, enum: ["Coming Soon", "Open", "Closed", "Pipeline"], required: true},
});

ShareSchema.virtual("url")
    .get(function () {
        return '/company/' + this.scrip;
    })


module.exports = mongoose.model("Share", ShareSchema);