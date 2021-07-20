const Course = require('../models/Course');
const {mutipleMongooseToObject} = require('../../util/mongoose');

class SiteController {
     // [GET] / 
     async index(req, res, next) {

        //callback
      /*Course.find({},function(err, courses){
          if(!err) {
              res.json(courses);
          }else {
              next(err);
          }
      });*/

        //promise
      await Course.find({})
        .then(courses => {
            //courses = courses.map(course => course.toObject())
            res.render('home',{
            //courses: courses
              courses: mutipleMongooseToObject(courses)
            });
         })
        //.then(courses => res.json(courses))
        .catch(next);

        //res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
