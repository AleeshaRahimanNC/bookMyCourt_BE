const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
name:{
    type: String,
    required: true
},
email:{
    type: String,
    required: true
},
number:{
    type: Number,
    required: true
},
password:{
    type: String,
    required: true
},
role:{
    type: Number,
    required: true,
    default: 2
}, 
timestap:{
    type: Date,
    default: new Date()
}

})

// role
// 1:admin
// 2:user

const users = mongoose.model('users', userSchema)
module.exports = users