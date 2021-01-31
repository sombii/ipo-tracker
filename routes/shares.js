var express = require('express');
var router = express.Router();

/* get shares */
router.get('/', function (req, res, next) {
    res.json({"tt": "respond with a resource"});
});

module.exports = router;
