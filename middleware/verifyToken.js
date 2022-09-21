const jwt = require('jsonwebtoken')

require('dotenv').config()

const verifyToken=(req,res,next)=>{

    // console.log(req.headers)

    //get the token from headers property of req object
    let token = req.headers.authorization

    //if no token found
    if(token==undefined){
        res.send({message:"Unauthorised request"})
    }

    
    try{
        //verigy token
        jwt.verify(token,process.env.SECRET_KEY)
        next()
    }
    catch(err){
        //pass error to error handling middleware
        next(err)
    }
}

module.exports = verifyToken;