import dbConnection from "../config/config.js";
import mongoose from "mongoose";
const movieSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    imgUrl:{
        type: String,
        required: true
    },
    cloudinary_Id:{
        type:String
    },
    genre:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    year:{
        type: Date,
        required: true
    },
    trailer:{
        type: String,
        
    }

})

const movie = dbConnection.model('movies', movieSchema)
export default movie