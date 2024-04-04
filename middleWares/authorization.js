const jwt =require('jsonwebtoken')

const userAuth =(req,res,next)=>{ 
    //Bearer uyfgoighbyx8uyblu7utdfyokjmvju7
    try {
        const token =req.headers['authorization'].split(' ')[1]
        jwt.verify(token,process.env.JWT_PASSWORD,(err,decodedToken)=>{
        if(decodedToken){
            // console.log(decodedToken);
            req.userId=decodedToken.userId
            console.log(decodedToken)
            next()
        }else{
            res.status(401).json('unauthorized user')
        }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
   
}

const adminAuth =(req,res,next)=>{ 
    //Bearer uyfgoighbyx8uyblu7utdfyokjmvju7
    try {
        
        const token =req.headers['authorization'].split(' ')[1]
        jwt.verify(token,process.env.JWT_PASSWORD,(err,decodedToken)=>{
            // console.log(decodedToken.role);
        if(decodedToken && decodedToken.role===1){
            req.userId=decodedToken.userId
            console.log(decodedToken)
            next()
        }else{
            res.status(401).json('unauthorized user')
        }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
   
}

module.exports = {userAuth, adminAuth}