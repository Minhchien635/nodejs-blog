const express = require('express');
const router = express.Router();

const imageController = require('../app/controllers/ImageController');

var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });

router.get('/photos', imageController.getPhotos);
router.get('/:id', imageController.getImage);
router.get('/', imageController.getPageUploadImage);
router.post('/', upload.single('image'), imageController.createImage);

module.exports = router;