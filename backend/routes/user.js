require('dotenv').config()

const express = require('express');
const z = require('zod');
const { User } = require('../db')
const { Account } = require('../db')
const jwt = require('jsonwebtoken')
const { authMiddleware } = require('../middleware')

const router = express.Router();

const signupBody = z.object({
    username: z.string().email(),
    password: z.string(),
    firstname: z.string(),
    lastname: z.string()
})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }

    const userExists = await User.findOne({
        username: req.body.username
    })

    if(userExists){
        return res.status(411).json({
            message: "User already exists"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    })

    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
    
    const token = jwt.sign({
        userId,
    }, process.env.JWT_SECRET);

    res.json({
        message: "User created successfully", 
        token: token
    })

})


const signinBody = z.object({
    username: z.string().email(),
    password: z.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Invalid inputs",
        })
    }

    const userExists = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(userExists){
        const token = jwt.sign({
            userId: userExists._id,
        }, process.env.JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }

    return res.status(411).json({
        message: "User does not exists"
    })
})


router.get("/me", authMiddleware ,async(req, res) => {
    const user = await User.findById(req.userId);
    if(!user){
        return res.status(404).json({
            "msg":"User not found!"
        })
    }

    const account = await Account.findOne({userId: req.userId});
    if(!account){
        return res.status(404).json({
            "msg":"Accont not found!"
        })
    }

    res.json({
        "firstname": user.firstname,
        "balance": account.balance
    })
   
})


router.get("/bulk",authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            { firstname: { "$regex": filter} },
            { lastnmae: { "$regex": filter}}
        ]
    })
    res.json({
        user: users
        .filter(user => user._id.toString() !== req.userId) // Convert ObjectId to string for comparison
        .map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})


const updateBody = z.object({
    password: z.string().optional(),
    firstname: z.string().optional(),
    lastname: z.string().optional()
})

router.put("/", authMiddleware, async (req, res) => {

    const { success } = updateBody.safeParse(req.body)

    if(!success){
        res.status(411).json({
            message:"Invalid Inputs"
        })
    }

    await User.updateOne({ _id: req.userId }, req.body);

    res.json({
        message: "Updated successfully"
    })

} )



module.exports = router;