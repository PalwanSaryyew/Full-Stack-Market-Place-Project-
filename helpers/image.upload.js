import multer from "multer";

const fileFilter = (req,file,cb)=>{
    const allowedMimeTypes = ['image/jpg', 'image/gif', 'image/jpeg', 'image/png'];
    if(!allowedMimeTypes.includes(file.mimetype)){
        cb(new Error('dine jpg, gif, jpeg, we png format bolmaly'), false)
    }
    cb(null, true)
};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split('/')[1]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${uniqueSuffix}.${extension}`)
    }
});
export const upload = multer({storage, fileFilter});