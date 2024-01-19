var express = require("express");
const { createCourt } = require("../controllers/adminController");
var router = express.Router();
const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, 'public/images');
  },
  filename: (req,file,cb) => {
    cb(null,Date.now()+'-'+file.originalname);
  },
});

const uploadImage = multer({storage: fileStorage});
router.post("/createCourt", uploadImage.single('image'),createCourt);

module.exports = router;
