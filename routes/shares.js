var express = require('express');
const share_controller = require("../controllers/shareController");
var router = express.Router();

// route for GET request to list all securities
router.get('/', share_controller.list_all_securities);

// route for GET request to list all items in a specific type of security
router.get('/security/:type', share_controller.list_individual_share_type);

// route for GET request to list all items in a specific type of issue
router.get('/share/:type', share_controller.list_individual_issue_type);



//routes to create/update/delete issues

// route for POST request to create new items/issue
router.post('/create', share_controller.create_new_issue);

module.exports = router;
