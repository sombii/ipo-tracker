var Share = require("../models/share");
const {body, validationResult} = require("express-validator");

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
    Share.find({issue_type: req.params.type, share_type: "Shares"})
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
exports.create_new_issue = [

    //validating and sanitizing data
    body("company", "Company must not be empty.").trim().isLength({min: 1}).escape(),
    body("issue_name", "Issue name must not be empty.").trim().isLength({min: 1}).escape(),
    body("issue_opening_date", "Invalid date").optional({checkFalsy: true}).toDate(),
    body("issue_closing_date", "Invalid date").optional({checkFalsy: true}).toDate(),
    body("issue_last_closing_date", "Invalid date").optional({checkFalsy: true}).toDate(),
    body("issue_manager", "Issue manager must not be empty.").trim().isLength({min: 1}).escape(),
    body("issue_type", "Issue type must not be empty.").trim().isLength({min: 1}).escape(),
    body("issued_unit", "Issued unit must not be empty.").trim().isLength({min: 1}).escape(),
    body("min_unit", "Minimum unit must not be empty.").trim().isLength({min: 1}).escape(),
    body("listing_date", "Invalid date").optional({checkFalsy: true}).toDate(),
    body("per_unit", "Per unit must not be empty.").trim().isLength({min: 1}).escape(),
    body("ratio", "Ratio must not be empty.").trim().isLength({min: 0}).escape(),
    body("scrip", "Scrip must not be empty.").trim().isLength({min: 1}).escape(),
    body("sector", "Sector must not be empty.").trim().isLength({min: 1}).escape(),
    body("share_type", "Share type must not be empty.").trim().isLength({min: 1}).escape(),
    body("status", "Status must not be empty.").trim().isLength({min: 1}).escape(),

    (req, res, next) => {

        const errors = validationResult(req);

        const share = new Share({
            company: req.body.company,
            issue_name: req.body.issue_name,
            issue_opening_date: req.body.issue_opening_date,
            issue_closing_date: req.body.issue_closing_date,
            issue_last_closing_date: req.body.issue_last_closing_date,
            issue_manager: req.body.issue_manager,
            issue_type: req.body.issue_type,
            issued_unit: req.body.issued_unit,
            min_unit: req.body.min_unit,
            listing_date: req.body.listing_date,
            per_unit: req.body.per_unit,
            ratio: req.body.ratio,
            scrip: req.body.scrip,
            sector: req.body.sector,
            share_type: req.body.share_type,
            status: req.body.status,
        });

        if (!errors.isEmpty()) {
            res.json(errors)
        } else {
            share.save(function (err, share) {
                if (err) {
                    return next(err)
                }
                res.json(share);
            })
        }
    }
];
















