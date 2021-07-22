const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

//newController.index

router.get('/stored/posts', meController.storesPosts);
router.get('/trash/posts', meController.trashPosts);

module.exports = router;
