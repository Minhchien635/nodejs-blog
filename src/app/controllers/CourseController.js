const Course = require('../models/Course');
const {mutipleMongooseToObject} = require('../../util/mongoose');

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({slug: req.params.slug})   
            .then(course => {
                 res.json(course);
            })
            .catch(next)
        //res.send('course detail' + req.params.slug);
    }
}

module.exports = new CourseController();
