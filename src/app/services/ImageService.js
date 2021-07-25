const image = require('../models/Image')
const fs = require('fs');
const path = require('path');

class ImageService{

    async getPhotos(req, res, next) {
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
                return res.render('photo',{
                    photos
                })
            })
    }

    async getPageUploadImage(req, res, next) {
        image.find({}, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            }
            else {
                res.render('imagesPage', { items: items });
            }
        });
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