const multer = require('multer');


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 10, //10 Mb max file size
    },
})



module.exports = upload;