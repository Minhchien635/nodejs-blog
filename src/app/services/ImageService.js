const image = require('../models/Image')
const fs = require('fs');
const path = require('path');

class ImageService{

    //getImage(http://localhost:3000/images/60fc33a03c12863d89462178)
    async getImage(req, res, next) {
        await image.findById(req.params.id)
            .then(image => {
                res.contentType(image.img.contentType);
                res.send(image.img.data);     
            })
    }

    //getImage(base64)
    async getImages(req, res, next) {
        await image.find({})
            .then(images => {
                let photos = []
                images.forEach(image => {
                    photos.push({
                        name: image.name,
                        desc: image.desc,
                        contentType: image.img.contentType,
                        data: (image.img.data).toString('base64'),
                    })
                })
                return res.render('photos',{
                    photos
                })
            })
            .catch(err=>{
                return res.json(err);
            })
    }

    async getPageUploadImage(req, res, next) {
        await image.find({})
            .then(image => {
                res.render('imagesPage', {image});
            })
            .catch(err => {
                return res.json(err);
            })
    }

    async createImage(req, res, next) {
        var obj = {
            name: req.body.name,
            desc: req.body.desc,
            img: {
                data: fs.readFileSync(path.join('src/public/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
        }
        console.log(obj)
        await image.create(obj, (err, item) => {
            if (err) {
                console.log(err);
            }
            else {
                // item.save();
                res.redirect('/');
            }
        });
    }
}

module.exports = new ImageService();