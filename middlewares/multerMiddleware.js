import DataURIParser from "datauri/parser.js";
import multer from "multer";
import path from "path";


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const parser = new DataURIParser();

export const formatPicture =(file)=>{
    const fileExtension = path.extname(file.originalname).toString();
    return parser.format(fileExtension, file.buffer).content
}

export default upload