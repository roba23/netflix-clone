import multer from "multer"
import path from "path"

export default multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb)=>{
        let ext = path.extname(file.originalname).toLowerCase();
        if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png"){
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true);
    },
    }
)