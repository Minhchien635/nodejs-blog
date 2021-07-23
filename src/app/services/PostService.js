const Post = require('../models/Post');
const Account = require('../models/Account');
const { mongooseToObject } = require('../../util/mongoose');
const verifyAccount = require('../security/VerifyAccount');

class PostService {
    // [GET] /courses/:slug
    // [GET] /courses/:slug
    async show(req, res, next) {
        await Post.findOne({_id: req.params.id})   
            .then(async (post) => {
                 const username = (await Account.findOne({_id: post.user_id})).username;
                 res.render('posts/show',{
                   post: mongooseToObject(post),
                   username,
                });
            })
            .catch(next)
        //res.send('course detail' + req.params.slug);
    }

    // [GET] /courses/create
    create(req, res, next) {
       res.render('posts/create');
    }

     // [POST] /courses/store
    async store(req, res, next) {
      const verify = await verifyAccount(req)

      const post = new Post({
        title: req.body.title,
        content: req.body.content,
        user_id: verify.user._id,
      });

      console.log(post);
      post.save()
        .then(() => res.redirect('/me/stored/posts'))
        .catch(error => {
            console.log(error)
        } );
     }

     // [GET] /courses/:id/edit
    edit(req, res, next) {
        Post.findById(req.params.id)
            .then(post => res.render('posts/edit',{
                post: mongooseToObject(post)
            }))
            .catch(next);
     }

      // [PUT] /courses/:id
     update(req, res, next){
       Post.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.redirect('/me/stored/posts'))
        .catch(next);
     }

     // [DELETE] /courses/:id
     delete(req, res, next){
       Post.delete({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
      }

      // [DELETE] /courses/:id/force
      forceDelete(req, res, next){
        Post.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
      }

      // [PATCH] /courses/:id/restore
      restore(req, res, next){
        Post.restore({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
      }

      // [POST] /handle-form-actions
      handleFormActions(req, res, next){
          switch(req.body.action){
            case 'delete':
              Post.delete({ _id: {$in: req.body.postIds} })
                .then(() => res.redirect('back'))
                .catch(next);
              break;

            default:
              res.json({message: 'Action invalid!' });
          }
      }

      // [POST] /trash-handle-form-actions
      trashHandleFormActions(req, res, next){
        switch(req.body.action){
          case 'restore':
            Post.restore({ _id: {$in: req.body.postIds}})
              .then(() => res.redirect('back'))
              .catch(next);
            break;

          default:
            res.json({message: 'Action invalid!' });
        }
      }
 
}

module.exports = new PostService();
