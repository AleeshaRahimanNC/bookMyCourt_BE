var express = require("express");
const { createCourt,addtimeslotsData } = require("../controllers/adminController");
var router = express.Router();
const multer = require("multer");
const { userAuth, adminAuth } = require("../middleWares/authorization");

const fileStorage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, 'public/images');
  },
  filename: (req,file,cb) => {
    // cb(null,Date.now()+'-'+file.originalname);
    cb(null,file.fieldname+'-'+Date.now()+file.originalname);
  },
});

const uploadImage = multer({storage: fileStorage});
router.post("/createCourt", uploadImage.single('image'),createCourt);
router.post("/addtimeslotsData", userAuth,addtimeslotsData);

module.exports = router;
