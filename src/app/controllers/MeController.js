const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');
const Post = require('../models/Post');

class MeController {
    // [GET] /me/stored/courses
    storesPosts(req, res, next) {
        Promise.all([Post.find({}), Post.countDocumentsDeleted()])
            .then(([posts, deletedCount]) => 
                res.render('me/stored-posts',{
                    deletedCount,
                    posts: mutipleMongooseToObject(posts),
                })
            )
            .catch(next);
            
         /*   
        Courses.countDocumentsDeleted()
            .then((deleteCount) => {
                console.log(deleteCount);
            })
            .catch(() => {});
        

        Course.find({})
            .then(courses => res.render('me/stored-courses',{
                courses: mutipleMongooseToObject(courses)
            }))
            .catch(next);
        */
    }

    // [GET] /me/trash/courses
    trashPosts(req,res,next){
        Post.findDeleted({})
            .then(posts => res.render('me/trash-posts',{
                posts: mutipleMongooseToObject(posts)
            }))
            .catch(next);
    }

}

module.exports = new MeController();
