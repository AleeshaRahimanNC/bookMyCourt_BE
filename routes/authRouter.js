var express = require('express');
var router = express.Router();
const {doSignUp} = require('../controllers/userController')

router.post('/signup', doSignUp)

module.exports = router;
