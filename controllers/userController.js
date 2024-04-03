const USERS = require("../models/userSchema");
const COURTS = require("../models/courtSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const COURT_SCHEDULES_MODEL = require("../models/courtSchedulesModel");
const ObjectId = require("mongoose").Types.ObjectId;

const doSignUp = (req, res) => {
  bcrypt.hash(
    req.body.password,
    parseInt(process.env.SALT_ROUNDS),
    function (err, hash) {
      USERS({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        password: hash,
      })
        .save()
        .then((resp) => {
          console.log(resp, "res after user creation");
          res.status(200).json({ message: "Signup Successfull" });
        })
        .catch((error) => {
          console.log(error);
          res.status(403).json({ message: "Signup Failed" });
        });
    }
  );
};

const doLogin = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const userDetails = await USERS.findOne({ email: email });
    if (userDetails) {
      bcrypt.compare(password, userDetails.password, (err, result) => {
        if (result) {
          // let token = null;
          //console.log({token})
          userDetails.password = undefined;
          const options = { expiresIn: "2d" };
          const token = jwt.sign(
            {
              userId: userDetails._id,
              name: userDetails.name,
              role: userDetails.role,
              email: userDetails.email,
            },
            process.env.JWT_PASSWORD,
            options
          );
          res.status(200).json({ userDetails, token });
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {}
};

const getCourtsData = (req, res) => {
  COURTS.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json("server error");
    });
};

const getCourtDatabyId = (req, res) => {
  COURTS.findOne({ _id: req.query.id })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json("server error");
    });
};

const getslotsdata = (req, res) => {
  let currentHour = 0;
  currentDate = new Date(req.query.date);

  if (new Date(new Date().setUTCHours(0, 0, 0, 0)) === currentDate) {
    currentHour = new Date().getHours();
  }

  COURT_SCHEDULES_MODEL.aggregate([
    {
      $match: {
        courtId: new ObjectId(req.query.courtId),
        date: currentDate,
        "slot.id": { $gte: currentHour }
      }},
      {
        $project:{
          _id:1,date:1,slot:1,cost:1,bookedBy:1
        }
      }
    
  ]).then((result) => {
    console.log(result);
    res.status(200).json(result);
  });
  try {
  } catch (error) {}
};

module.exports = {
  doSignUp,
  doLogin,
  getCourtsData,
  getCourtDatabyId,
  getslotsdata,
};
