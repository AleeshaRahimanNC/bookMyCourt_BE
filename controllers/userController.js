const USERS = require("../models/userSchema");
const COURTS = require("../models/courtSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
          userDetails.password=undefined
          const options ={expiresIn: "2d"}
          const token = jwt.sign(
            {
              userId: userDetails._id,
              name: userDetails.name,
              role: userDetails.role,
              email: userDetails.email,
            },
            process.env.JWT_PASSWORD,
            options
          )
          res
            .status(200)
            .json({ userDetails, token })
        }
       else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
} catch (error) {
    
  }
}
  

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

module.exports = { doSignUp, doLogin, getCourtsData, getCourtDatabyId };
