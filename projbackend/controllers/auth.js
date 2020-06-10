const User = require("../models/user");
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


//// SIGN-UP route
exports.signup = (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            param: errors.array()[0].param,
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "Unable to save user in DB"
            })
        }
        return res.json({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            id: user._id
        })
    })
}

//// SIGN-IN route
exports.signin = (req, res) => {
    const errors = validationResult(req)
    const { email, password } = req.body
    if (!errors.isEmpty()) {
        return res.status(422).json({
            param: errors.array()[0].param,
            error: errors.array()[0].msg
        })
    }
    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Email is not valid"
            })
        }
        if (!user) {
            return res.status(400).json({
                error: "User does not exist"
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and Password do not match"
            })
        }
        // create authentication token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET)
        // put token in cookie
        res.cookie("token", token, { expire: new Date() + 9999 })
        // send response to frontend
        const { _id, name, email, role } = user
        return res.json({ token, user: { _id, name, email, role } })
    })
}

//// SIGN-OUT route
exports.signout = (req, res) => {
    res.clearCookie("token")
    return res.json({
        message: "user successfully signed out"
    })
}

//// PROTECTED ROUTES
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
})

//// Custom MIDDLEWARES
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next()
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "ACCESS DENIED! You are not ADMIN!"
        })
    }
    next()
}



