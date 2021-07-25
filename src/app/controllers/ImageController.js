const imageService = require('../services/ImageService')

class ImageController{

    getPageUploadImage(req, res, next){
        return imageService.getPageUploadImage(req, res, next);
    }

    createImage(req, res, next){
        return imageService.createImage(req, res, next);
    }

    getPhotos(req, res, next){
        return imageService.getPhotos(req, res, next);
    }

}

module.exports = new ImageController();