import movie from "../model/movieModel.js"
import sharp from "sharp"
import streamifier from "streamifier"
import cloudinary from "../middleware/cloudinary.js"

export default {
    async addMOvieForm(req,res){
        res.render("add.ejs")
    },
    async addMovie(req,res){
        try{
            console.log("reached on add movie")
            if(!req.file){
                return res.status(400).send("No file uploaded.");
            }
            const resizedBuffer = await sharp(req.file.buffer)
            .resize({width: 1920, height: 1080, fit: 'inside', withoutEnlargement: true})
            .jpeg({quality: 80})
           .toBuffer();

           const result = await new Promise((resolve, reject)=>{
            let stream = cloudinary.uploader.upload_stream(
                {folder: 'movie_images'},
                (error, result)=>{
                    if(result) resolve(result);
                    else reject(error)
                }
            );
            streamifier.createReadStream(resizedBuffer).pipe(stream)
           })
           console.log("body:", req.body)
           console.log("result:", result)
           console.log("what is this ")
           movie.insertOne({
            name: req.body.name,
            description: req.body.description,
            imgUrl: result.secure_url,
            cloudinary_Id: result.public_id,
            genre: req.body.genre,
            year: req.body.date,
            trailer: req.body.trailer

           })
            
           res.redirect("/")
        }
        catch(error){

        }
    },
    async getMOvie(req,res){
        try{
            let movies
            if(req.query.search !== ''){
                movies = await movie.find({
                    name: {$regex:req.query.search, $options: 'i'}
            })
            }
            else{
                movies = await movie.find()
            }
            
            
            res.json({data: movies})
        }
        catch(error){
            console.error(error)
        }
        
    }

}