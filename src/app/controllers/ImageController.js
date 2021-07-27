const imageService = require('../services/ImageService')

class ImageController{

    getPageUploadImage(req, res, next){
        return imageService.getPageUploadImage(req, res, next);
    }

    createImage(req, res, next){
        return imageService.createImage(req, res, next);
    }

    getImage(req, res, next){
        return imageService.getImage(req, res, next);
    }

    getPhotos(req, res, next){
        return imageService.getImages(req, res, next);
    }

}

module.exports = new ImageController();