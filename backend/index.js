import express from "express"
import 'dotenv/config'
import './config/config.js'
import router from "./routes/index.js"
import bodyParser from "body-parser"
import configurePassport from "./config/passportConfig.js"
import session from "express-session"
import MongoStore from "connect-mongo"
import passport from "passport"
import cors from "cors"

const app = express()

// Required for Vercel proxy headers
app.set("trust proxy", 1)

app.use(express.json())

// Dynamic CORS for local development and Vercel production
const allowedOrigins = [
    'http://localhost:5173',
    'https://netflix-clone-2yxk.vercel.app' // Add your live Vercel frontend URL here later
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1 && process.env.NODE_ENV === 'production') {
            return callback(new Error('CORS policy violation'), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
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
        ttl: 24 * 60 * 60 // 24 hours in seconds
    }),
    cookie: {
        path: '/',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        secure: process.env.NODE_ENV === 'production', // MUST be true on Vercel (HTTPS)
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' 
    },
    name: "robflix"
}));

app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use("", router)

app.get("/", async (req, res) => {
    res.send("Hello World from Vercel Serverless Backend!")
});

// IMPORTANT FOR LOCAL DEVELOPMENT: Keep app.listen only when not running on Vercel
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Local server running at http://localhost:${port}`);
    });
}

// EXPORT FOR VERCEL SERVERLESS
export default app;