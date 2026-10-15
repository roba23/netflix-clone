import express from "express"
import movieController from "../controller/movieController.js"
import multer from "../middleware/multer.js"
const router = express.Router()

router.get("/add", movieController.addMOvieForm)
router.post("/add",multer.single('image'),movieController.addMovie)
router.get("/getMovie", movieController.getMOvie)
export default router