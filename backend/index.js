import express from "express"
import 'dotenv/config'
import './config/config.js'
import router from "./routes/index.js"
import bodyParser, { urlencoded } from "body-parser"
import configurePassport from "./config/passportConfig.js"
import  session from "express-session"
import {MongoStore} from "connect-mongo"
import passport from "passport"
import cors from "cors"
import 'dotenv/config'
import movie from "./model/movieModel.js"
const port = 3000
const app = express()

app.set("trust proxy", 1)
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        dbName: process.env.dbName,
        collectionName: 'session',
        ttl: 24 * 60 * 60 // MongoStore TTL expects SECONDS (24 hours), NOT milliseconds!
    }),
    cookie: {
        path: '/',
        maxAge: 24 * 60 * 60 * 1000, // Express session maxAge expects MILLISECONDS (24 hours)
        secure: false,      // 👈 CHANGE TO TRUE: Required by the browser for sameSite: 'none'
        httpOnly: true,
        sameSite: 'lax'   // Allows the cookie to travel between port 5173 and port 3000
    },
    name: "robflix"
}));
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.use("", router)
app.get("/", async(req,res)=>{
    
    res.send("hellow world")
})

app.listen(process.env.PORT || port, ()=>{
    console.log(`http://localhost:${port}`)
})