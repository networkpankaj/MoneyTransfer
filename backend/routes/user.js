const express = require('express');

const router  = express.Router();
const zod = require("zod")
const {User, Account} = require("../db")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require('../middleware');



const signupSchema = zod.object({
    username: zod.string().min(3).max(30),
    password: zod.string().min(6),
    firstName: zod.string().max(50),
    lastName: zod.string().max(50)
})

router.post("/signup", (req, res) => {
    const body = req.body;
    const { success } = signupSchema.safeParse(req.body);
    if (!success) {
        return res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const user = User.find.findOne({
        username: body.username
    })

    if(user._id) {
        return res.json({
            message: "Email already taken"
        })
    }

    const dbUser = new User.create(body)
    const token = jwt.sign({userId: dbUser._id}, JWT_SECRET);

    res.json({
        message: "User created",
        token: token
    })
})


module.exports = router;