var express = require('express');
const { userAuth } = require('../middleWares/authorization');
const { getCourtsData } = require('../controllers/userController');
var  router = express.Router();

router.get('/getCourtsData',userAuth, getCourtsData)

module.exports = router;
