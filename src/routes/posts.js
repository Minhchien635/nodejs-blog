const express = require('express');
const router = express.Router();

const postController = require('../app/controllers/PostController');

//newController.index
router.get('/create', postController.create);
router.post('/store', postController.store);
router.get('/:id/edit', postController.edit);
router.post('/trash-handle-form-actions', postController.trashHandleFormActions);
router.post('/handle-form-actions', postController.handleFormActions);
router.put('/:id', postController.update);
router.patch('/:id/restore', postController.restore);
router.delete('/:id', postController.delete);
router.delete('/:id/force', postController.forceDelete);
router.get('/:id', postController.show);

module.exports = router;
