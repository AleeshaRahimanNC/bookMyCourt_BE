const jwt =require('jsonwebtoken')

const userAuth =(req,res,next)=>{ //Bearer uyfgoighbyx8uyblu7utdfyokjmvju7
    const token =req.headers['authorization'].split(' ')[1]
    jwt.verify(token,process.env.JWT_PASSWORD,(err,decodedToken)=>{
    if(decodedToken){
        req.userId=decodedToken.userId
        console.log(decodedToken)
        next()
    }else{
        res.status(401).json('unauthorized user')
    }
    })
}

module.exports = {userAuth}