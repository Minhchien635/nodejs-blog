const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');
const Post = require('../models/Post');
const authentication = require('../security/Authentication')

class MeController {
    // [GET] /me/stored/courses
    async storesPosts(req, res, next) {
        const user = await authentication.verify(req, res, next);
        if(user){
            Promise.all([Post.find({user_id: user._id}), Post.countDocumentsDeleted({user_id: user._id})])
                .then(([posts, deletedCount]) => 
                    res.render('me/stored-posts',{
                        deletedCount,
                        posts: mutipleMongooseToObject(posts),
                    })
                )
                .catch(next);
        }
            
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
    async trashPosts(req,res,next){
        const user = await authentication.verify(req, res, next);
        if(user){
            await Post.findDeleted({user_id: user._id})
                .then(posts => res.render('me/trash-posts',{
                    posts: mutipleMongooseToObject(posts)
                }))
                .catch(next);
        }
    }

}

module.exports = new MeController();
