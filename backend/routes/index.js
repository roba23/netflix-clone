import express from "express"
import movieRoute from "./movieRoutes.js"
import userRoute from "./userRoutes.js"
const router = express.Router()

router.use("/movie", movieRoute)
router.use("/user", userRoute)
export default router
