const COURTS=require('../models/courtSchema')

const createCourt = (req, res) => {
COURTS({
    courtName:req.query.courtName,
    location:req.query.location,
    mobileNumber:req.query.mobileNumber,
    address:req.query.address,
    description:req.query.description,
    courtPic:req.file.filename
}).save().then((response)=>{
    res.status(200).json('COURT created successfully')
})
.catch(err=>{
    console.log(err);
    res.status(401).json('COURT creation failed')
})
};
module.exports = {createCourt}