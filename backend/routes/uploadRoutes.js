import path from 'path';
import express from "express";
import multer from 'multer';
import { error } from 'console';

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname)
        cb(null, `${file.fieldname}-${Date.now()}${extname}`)
    }
});
const fileFilter = (req, file, cb )=> {
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
    const extname = path.extname(file.originalname).toLocaleLowerCase();
    const mimetype = file.mimetype;
    if(filetypes.test(extname) && mimetypes.test(mimetype)){
        cb(null, true);
    }else{
        cb(new Error('Images Only'), false);
    }
}
const upload = multer({storage, fileFilter});
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
    uploadSingleImage(req, res, (error) => {
        if(error){
            res.status(400).send({message: error.message})
        }else if(req.file){
            res.status(200).send({
                message: "Image Uploaded",
                image: `/${req.file.path}`
            })
        }else{
            res.status(400).send({message: "No Image File Provided"})
        }
    })
})

export default router;