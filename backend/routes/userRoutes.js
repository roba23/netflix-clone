import express from "express"
import userController from "../controller/userController.js"
import passport from "passport"
import { isLoggedIn } from "../middleware/authentication.js"
const router = express.Router()

router.get("/login" , userController.getLogin)
router.post("/register", userController.registerUser )
router.post("/login", passport.authenticate('local'),userController.login)
router.get("/checkStatus",isLoggedIn)
router.get("/logout", userController.logout)
router.get("/subscribe", userController.subscribe)
router.get("/checkpayment", userController.checkPayment)
export default router