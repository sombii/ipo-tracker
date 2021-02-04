const User = require("../models/user");
const bcrypt = require("bcrypt");
const {body, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
//register new user
exports.register = [

    body("password", "Invalid password.").isString().trim().isLength({min: 8}).escape(),
    body("userName", "Invalid username.").isString().trim().isLength({min: 1}).escape(),
    body("name", "Invalid name.").isString().trim().isLength({min: 3}).escape(),
    body("email", "Invalid email.").isString().trim().escape().isEmail(),

    async (req, res, next) => {

        const errors = validationResult(req);

        //salting and hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create new user based on request
        const user = new User({
            userName: req.body.userName,
            password: hashedPassword,
            name: req.body.name,
            email: req.body.email,
        });

        //if any validation error then respond with error else down below
        if (!errors.isEmpty()) {
            res.json(errors);
        } else {

            //check if username already exist.
            const userExist = await User.findOne({userName: req.body.userName});
            if (userExist) return res.status(400).send("Username already in use");

            //check if email already exist.
            const emailExist = await User.findOne({email: req.body.email});
            if (emailExist) return res.status(400).send("Email already in use");

            //if everything goes right we save our new user on db and return the user object
            user.save(function (err, user) {
                if (err) {
                    return next(err)
                }
                res.json({_id: user._id, userName: user.userName, name: user.name, email: user.email});
            });

        }
    }
]

//login user
exports.login = [

    body("userName", "Invalid login details.").isString().trim().isLength({min: 1}).escape(),
    body("password", "Invalid login details.").isString().trim().isLength({min: 8}).escape(),

    async (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.json(errors);
        } else {
            //check if user exists
            const user = await User.findOne({userName: req.body.userName});
            if (!user) return res.status(400).send("User not found.");
            //checking password
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if (!validPass) return res.status(400).send("Invalid login details.")

            //if pass is correct
            //create new token
            const token = jwt.sign({_id: user._id, name: user.name, userName: user.userName}, process.env.TOKEN_SECRET);
            res.header("token", token).send("logged in");
        }

    }
]