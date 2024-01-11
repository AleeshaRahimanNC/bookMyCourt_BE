const USERS = require('../models/userSchema')
const jwt = require('jsonwebtoken')

const doSignUp = (req, res) =>{

    try {
        USERS({
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            password: req.body.password,
        }).save().then((resp) =>{
            console.log(resp, 'res after user creation');
            res.status(200).json({message: 'Signup Successfull'})
        }) 
    } catch (error) {
        console.log(error);
        res.status(403).json({message: 'Signup Failed'})
    }

}

const doLogin = async(req, res) =>{
    console.log(req.body);
    const userDetails = await USERS.findOne({email:req.body.email})
if(userDetails){
        if(userDetails.password===req.body.password){
            let token=null
            //console.log({token})
            token=jwt.sign({userId:userDetails._id,name:userDetails.name,role:userDetails.role,email:userDetails.email},process.env.JWT_PASSWORD,{expiresIn:'2d'})
            res.status(200).json(
                {message:'Login Successfull',token})
        }
}else{
    res.status(401).json({message:'Invalid Credentials'})
}

 }

module.exports = {doSignUp, doLogin}