import dns from 'dns';//This fix mongodb connection problem.
dns.setServers(['8.8.8.8', '8.8.4.4']);

import mongoose from "mongoose"
import 'dotenv/config.js'


const url = process.env.MONGO_URL
const dbConnection = mongoose.createConnection(url, {
    dbName: "netflix"
})




dbConnection.on("connected", ()=>{
    console.log("succesfully connected to mongodb")
});

dbConnection.on("error", (err)=>{
    console.error("mongodb connection error: ", err)
})


export default dbConnection