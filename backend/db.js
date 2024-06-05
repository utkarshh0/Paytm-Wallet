require('dotenv').config()

const mongoose = require('mongoose');
const { Schema } = mongoose;

  mongoose.connect(process.env.DB_URL, {
    connectTimeoutMS: 30000
  })
.then(() => console.log("Db connected Successfully"))
.catch((err) => console.error(err))

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 30
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    }
})

const accountSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})


const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
    User,
    Account
}