const fs = require('fs');
const Shares = require("./models/share");
const Company = require("./models/company");
const dummy = require("mongoose-dummy");
const ignoredFields = ["_id", "created_at", "__v", /detail.*_info/];

let dummyData = dummy(Shares, {
    ignore: ignoredFields,
    returnData: true
});

fs.appendFile('shares.json', JSON.stringify(dummyData), function (err) {
    if (err) return console.log(err);
});
