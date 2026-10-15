import mongoose from "mongoose";
import dbConnection from "../config/config.js";

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    status:{
        type:Object,
        default: {
            subscription: false,
            expiration: null
        }
    },
    
})

const user = dbConnection.model('users', userSchema)

export default user