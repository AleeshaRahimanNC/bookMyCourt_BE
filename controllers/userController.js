const USERS = require('../models/userSchema')

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

// const doLogin = (req, res) =>{
    
// }

module.exports = {doSignUp}