const express = require('express')
const mongoose = require('mongoose')
const { User } = require('../db')
const { Account } = require('../db')
const { authMiddleware } = require('../middleware')

const router = express.Router()

router.get('/balance', authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })  

    res.json({
        balance: account
    })
})

router.post("/transfer", authMiddleware, async (req, res) => {

    const { amount, to } = req.body;

    const account = await Account.findOne({
        userId: req.userId
    });

    if (account.balance < amount) {
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    });

    if (!toAccount) {
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    })

    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    })

    res.json({
        message: "Transfer successful"
    })

    // const session = await mongoose.startSession();

    // session.startTransaction();
    // const{ amount, to } = req.body;

    // const account = User.findOne({ userId: req.userId }).session(session)

    // if(!account || account.balance < amount){
    //     await session.abortSession();
    //     res.status(400).json({
    //         "msg": "Insufficient funds"
    //     })
    // }

    // const toAccount = User.findOne({userId: to}).session(session)

    // if(!toAccount){
    //     await session.abortSession();
    //     res.status(400).json({
    //         "msg": "Invalid Account"
    //     })
    // }

    // await Account.updateOne({userId: req.userId}, {$inc: { balance : -amount}}).session(session)
    // await Account.updateOne({userId: to}, {$inc: { balance : amount}}).session(session)

    // await session.commitTransaction();
    // res.json({
    //     "msg": "Transaction Successfull"
    // })
})


module.exports = router