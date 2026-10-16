import user from "../model/userModel.js";
import passport from "passport";
import bcrypt from "bcrypt"
import 'dotenv/config'
import mongoose from "mongoose";
import { Chapa } from "chapa-nodejs";
import {isLoggedIn} from "../middleware/authentication.js"
const chapa = new Chapa({
    secretKey: process.env.TEST_KEY
})
export default {
    async getLogin(req,res){
        res.render("login.ejs")
    },
    async registerUser(req,res,next){
        console.log("the register body is:", req.body)
        try{
            let hashed = await bcrypt.hash(req.body.password, 10)
            
            let result = await user.insertOne({
                username: req.body.username,
                date: req.body.birthDate,
                password: hashed,
                email: req.body.email

            })
            req.login(result, (err)=>{
                if(err){
                    return next(err)
                }
                return res.json("fuck me men")
            })
            console.log("the result is:", result)
            
        }
        catch(error){
            console.error("error registering user:", error)
        }
        
    },
    async login(req,res){
       
        
        res.json({
            success: true,
            username: req.user.username,
            status: req.user.status
        })
        
    },
    
    async logout(req, res, next) {
    req.logout((err) => {
        if (err) return next(err);

        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Could not log out" });
            }

            // 👇 Explicitly clear the 'robflix' cookie with matching Vercel production attributes
            res.clearCookie('robflix', {
                path: '/',
                httpOnly: true,
                secure: true,        // Must be true on Vercel production HTTPS
                sameSite: 'none'     // Must be 'none' for cross-subdomain requests
            });

            return res.status(200).json({ success: true, message: "Logged out successfully" });
        });
    });
},
    async subscribe(req,res){
        const tx_ref = chapa.genTxRef()
        const user = req.user
        console.log("user id:", user._id)
        console.log("the ref is:", tx_ref)
        const custom_ref = req.user._id.toString() + '_' + tx_ref
        try{
            const response = await chapa.initialize({
                first_name: user.username,
                email: user.email,
                currency: "ETB",
                amount: "999",
                tx_ref: custom_ref,
                callback_url: "https://m9vpgb7m-3000.inc1.devtunnels.ms/user/checkPayment",
                return_url: "http://localhost:5173/subscribed"
                ,customization:{
                    logo: "https://res.cloudinary.com/n4ucymig/image/upload/v1792055871/logo.png",
                    title: "Robflix"
                },
                metadata:{
                    userId: req.user._id.toString()
                }
            
            })
           
            res.json({payment_link: response.data.checkout_url})

        }
        catch(error){
            console.error("payment error:", error)
        }
    },
    async checkPayment(req,res){
       
        
        const data = req.query.trx_ref.split('_')
        try{
            const response = await chapa.verifyTransfer({
                tx_ref: req.query.trx_ref
            })
            if(response.status === 'success'){
                console.log("payment is succesfull")
                await user.updateOne({_id: new mongoose.Types.ObjectId(data[0])},
                    {
                        $set:{
                            'status.subscription': true,
                            'status.expiration': new Date(Date.now() + (30 * 24 * 60 * 60 * 1000))
                        }

                    }
                )
                console.log("subscribed succesfully")
            }
            else{
                console.log("payment failed")
            }
        }
        catch(error){
            console.error("chck payment:", error)
        }
    }

}