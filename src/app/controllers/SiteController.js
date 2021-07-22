const Post = require('../models/Post');
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
      await Post.find({})
        .then(posts => {
            //courses = courses.map(course => course.toObject())
            res.render('home',{
            //courses: courses
              posts: mutipleMongooseToObject(posts)
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
