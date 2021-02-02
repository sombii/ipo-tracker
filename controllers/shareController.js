
var Share = require("../models/share");

// list all securities on GET request
exports.list_all_securities = function (req, res, next) {
    Share.find()
        .populate("company")
        .exec(function (err, securities_list) {
            if (err) {
                return next(err);
            }
            res.json(securities_list);
        });
}

// list all individual issue types ipo fpo right on GET request
exports.list_individual_issue_type = (req, res, next) => {
    Share.find({issue_type: req.params.type})
        .populate("company")
        .exec(function (err, individual_list) {
            if (err) {
                return next(err);
            }
            res.json(individual_list);
        });
}

// list all individual security bond mf on GET request
exports.list_individual_share_type = (req, res, next) => {
    console.log(req.params.type)
    Share.find({share_type: req.params.type})
        .populate("company")
        .exec(function (err, individual_list) {
            if (err) {
                return next(err);
            }
            res.json(individual_list);
        });
}

//post controllers

// create new any type of issue
exports.create_new_issue = (req, res, next) => {
    res.send("not implemented yet");
};