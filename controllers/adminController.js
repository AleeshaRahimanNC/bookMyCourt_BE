const { json } = require("express");
const COURTS = require("../models/courtSchema");
const SCHEDULES = require("../models/courtSchedulesModel");

const createCourt = (req, res) => {
  // console.log(res);
  // console.log(req);
  COURTS({
    courtName: req.query.courtName,
    location: req.query.location,
    mobileNumber: req.query.mobileNumber,
    address: req.query.address,
    description: req.query.description,
    courtPic: req.file.filename,
  })
    .save()
    .then((response) => {
      console.log("fff", response);
      res.status(200).json({ response, message: "COURT created successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json("COURT creation failed");
    });
};

const addtimeslotsData = (req, res) => {
  console.log(req.body);
  const { startDate, endDate, cost, slots, courtId } = req.body;
  let currentDate = new Date(startDate);
  const lastDate = new Date(endDate);
  const slotObjects = [];

  while (currentDate <= lastDate) {
    for (let slot of slots) {
      slotObjects.push({
        date: JSON.parse(JSON.stringify(currentDate)),
        slot: {
          name: slot.name,
          id: slot.id,
        },
        cost,
        courtId,
      });
    }

    //currentDate.getDate()+1==>3
    currentDate.setDate(currentDate.getDate() + 1);
  }
  SCHEDULES.insertMany(slotObjects)
    .then((response) => {
      res.status(200).json("Schedules created successfully");
    })
    .catch((err) => {
      res.status(500);
    });
  console.log(slotObjects, "slotObjects");
};

module.exports = { createCourt, addtimeslotsData };
