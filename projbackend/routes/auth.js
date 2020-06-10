const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const { signout, signup, signin, isSignedIn } = require("../controllers/auth")


////// route constants
////  this below portion is now moved to "../controllers/auth.js" file.
// const signout = (req, res) => {
//     // res.send("User signout success..")
//     res.json({
//         message: "Signed out."
//     })
// }


// routes
router.post("/signup", [
    check("name", "name should be atleast 3 characters").isLength({ min: 3 }),
    check("email", "bad email format").isEmail(),
    check("password", "password should be atleast 3 characters").isLength({ min: 3 })
], signup)

router.post("/signin", [
    check("email", "bad email format").isEmail(),
    check("password", "password field is required").isLength({ min: 1 })
], signin)

router.get("/signout", signout)

// router.get("/testroute", isSignedIn, (req, res) => {
//     res.json(req.auth)
// })


module.exports = router

