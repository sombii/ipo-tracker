var Company = require("../models/company");

//list all companies
exports.list_all = (req, res, next) => {
    Company.find()
        .exec(function (err, company_list) {
            if (err) {
                return next(err);
            }
            res.json(company_list);
        });
}

// create new company
exports.create_new_company = (req, res, next) => {

};
