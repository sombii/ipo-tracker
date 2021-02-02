const Company = require("../models/company");
const {body, validationResult} = require("express-validator");

//list all companies
exports.list_all = (req, res, next) => {
    Company.find()
        .exec(function (err, company_list) {
            if (err) {
                return next(err);
            }
            const com = company_list.map(c => {
                return {name: c.name, established: c.established, established_formatted: c.established_formatted}
            })
            res.send(com);
        });
}

// create new company
exports.create_new_company = [

    body("name", "Name must be specified").isString().trim().isLength({min: 1}).escape(),
    body("established", "Invalid date").optional({checkFalsy: true}).toDate(),

    (req, res, next) => {
        const errors = validationResult(req);
        const company = new Company({
            name: req.body.name,
            established: req.body.established
        });
        if (!errors.isEmpty()) {
            res.json(errors);
        } else {
            company.save(function (err, company) {
                if (err) {
                    return next(err)
                }
                res.json(company)
            })
        }
    }
]
