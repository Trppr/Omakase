var router = require('express').Router();
var controller = require('../controller/gallery.controller.js');

router.get('/getPhotos', controller.gallery.getPhotos);

module.exports = router;
