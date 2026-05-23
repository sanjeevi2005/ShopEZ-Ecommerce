// server/middleware/upload.js
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Image-ah client/public/images folder-ku anuppurom
        cb(null, '../client/public/images'); 
    },
    filename: function (req, file, cb) {
        // Unique file name generate panrom
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const cleanFileName = file.originalname.replace(/\s+/g, '-');
        cb(null, uniqueSuffix + '-' + cleanFileName);
    }
});

const upload = multer({ storage: storage });
export default upload;