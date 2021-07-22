const Course = require('../models/Post');
const { mongooseToObject } = require('../../util/mongoose');
const postService = require('../services/PostService')

class PostController {
    // [GET] /courses/:slug
    // [GET] /courses/:slug
    show(req, res, next) {
      postService.show(req, res, next)
        //res.send('course detail' + req.params.slug);
    }

    // [GET] /courses/create
    create(req, res, next) {
      postService.create(req, res, next)
    }

     // [POST] /courses/store
    store(req, res, next) {
      // res.json(req.body);
      postService.store(req, res, next)
     }

     // [GET] /courses/:id/edit
    edit(req, res, next) {
      postService.edit(req, res, next)
     }

      // [PUT] /courses/:id
     update(req, res, next){
      postService.update(req, res, next)
     }

    // [DELETE] /courses/:id
    delete(req, res, next){
      postService.delete(req, res, next)
    }

    // [DELETE] /courses/:id/force
    forceDelete(req, res, next){
      postService.forceDelete(req, res, next)
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next){
      postService.restore(req, res, next)
    }

    // [POST] /handle-form-actions
    handleFormActions(req, res, next){
      postService.handleFormActions(req, res, next)

    }

    // [POST] /trash-handle-form-actions
    trashHandleFormActions(req, res, next){
      postService.trashHandleFormActions(req, res, next)
    }
 
}

module.exports = new PostController();
