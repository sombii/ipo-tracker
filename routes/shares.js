var express = require('express');
const share_controller = require("../controllers/shareController");
var router = express.Router();

// route for GET request to list all securities
router.get('/', share_controller.list_all_securities);

// route for GET request to list all items in a specific type of security
router.get('/security/:type', share_controller.list_individual_type);

// route for GET request to list all items in a specific type of share
router.get('/share/:type', share_controller.list_individual_share_type);

module.exports = router;
