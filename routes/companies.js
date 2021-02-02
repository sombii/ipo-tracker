const express = require("express");
const company_controller = require("../controllers/companyController");
const router = express.Router();

//route to list all companies
router.get('/', company_controller.list_all);

// route for POST request to create new items/issue
router.post('/create', company_controller.create_new_company);

module.exports = router;
