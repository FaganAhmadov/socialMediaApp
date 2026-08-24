// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // uploads qovluğu yaradılır
// const uploadPath = path.join(__dirname, '../../uploads');

// if (!fs.existsSync(uploadPath)) {
//     fs.mkdirSync(uploadPath, { recursive: true });
// }

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadPath);
//     },

//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage });

// module.exports = upload;

const multer = require("multer");
const storage = multer.memoryStorage();

const fileFilter = function (req, file, cb) {
    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("file type not allowed"), false);
    }
};

const limits = {
    fileSize: 5 * 1024 * 1024 // 5MB
};

const upload = multer({
    storage,
    fileFilter,
    limits
});

module.exports = upload;