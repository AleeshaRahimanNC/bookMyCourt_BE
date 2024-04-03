var express = require('express');
const { userAuth } = require('../middleWares/authorization');
const { getCourtsData, getCourtDatabyId, getslotsdata } = require('../controllers/userController');
var  router = express.Router();

router.get('/getCourtsData',userAuth, getCourtsData)
router.get('/getCourtDatabyId',userAuth, getCourtDatabyId)
router.get('/getslotsdata',userAuth, getslotsdata)

module.exports = router;
