const exp = require('express')
const userApp = exp.Router()

const expressAsyncHandler = require('express-async-handler')

const bcryptjs = require('bcryptjs')

const jwt = require('jsonwebtoken')

const verifyToken = require('../middleware/verifyToken')

require('dotenv').config()



//users
let users = [{
    id:100,
    name: 'Ravi',
    age: 22
}]

//middlewares

let middleware1 = (req,res,next)=>{
    console.log("Middleware - 1 executed")
    next()
}

let middleware2 = (req,res,next)=>{
    console.log("Middleware - 2 executed")
    next()
}

//approach-1
// userApp.use(middleware1)
// userApp.use(middleware2)


//create user api
//routes for GET request

//approach 2
// userApp.get('/getusers',middleware1,middleware2,(req,res)=>{
//     //send response
//     res.send({message:'All users data',payload:users})
// })









userApp.get('/getusers',expressAsyncHandler(async (req,res)=>{
    
    //get usercollectionObj
    let usercollectionObj = req.app.get("usercollectionObj")
    //get all users
    // usercollectionObj.find().toArray()
    // .then(userArr=>res.send({message:"All users",payload:userArr}))
    // .catch(err=>{
    //     console.log("Error in reading users",err)
    //     res.send({message:"Error",payload:err.message})
    // })

        //get all users
        let userArr = await usercollectionObj.find().toArray()
        res.send({message:'All users',payload:userArr})
    
}))











//error handling using express-async-handler

userApp.get('/getuser/:id',expressAsyncHandler(async (req,res)=>{
    let userId = (+req.params.id)
    // console.log(req.params.id)
    // let user = users.find(obj=>obj.id === userId)
    // if(user === undefined){
    //     res.send({message:'User not found'})
    // }
    // else{
    //     res.send({message:'User found',payload:user})
    // }


    let usercollectionObj = req.app.get("usercollectionObj")
    let user = await usercollectionObj.findOne({id:{$eq:userId}})
    res.send({message:'User',payload:user})

}))



userApp.get('/private',verifyToken,expressAsyncHandler((req,res)=>{

    //console.log(req.headers)
    res.send({message:'This is private route'})
}))







//routes for POST req
userApp.post('/create-user',expressAsyncHandler(async (req,res)=>{
    //get usercollectionObj
    let usercollectionObj = req.app.get('usercollectionObj')
    //get user obj from req
    let userObj = req.body

    //verify duplicate user
    let result = await usercollectionObj.findOne({username:{$eq:userObj.username}})
    
    //if username existed, send response as duplicate user
    if(result !== null){
        res.send({message:"Username already exists....please choose different username"})
    }

    //if user not existed,hash the password
    else{
        let hashedPassword = await bcryptjs.hash(userObj.password,6)

        //replace plain password with hashed password
        userObj.password  = hashedPassword

        //insert userobj
        await usercollectionObj.insertOne(userObj)
        
        //send response
        res.send({message:'User inserted'})
    }
}))


//route for User Login
userApp.post('/login',expressAsyncHandler(async(req,res)=>{
    //get usercollectionObj
    let usercollectionObj = req.app.get('usercollectionObj')
    //get user obj from req
    let userCredentialObj = req.body
    // console.log(userObj)


    //verify username
    let user = await usercollectionObj.findOne({username:userCredentialObj.username})
    //if username not found
    if(user === null){
        res.send({message:"Invalid username"})
    }
    //if username matched
    else{
        //compare passwords
        let result = await bcryptjs.compare(userCredentialObj.password,user.password) 
        //if passwords not matchec
        if(result === false){
            res.send({message:"Invalid Password"})
        }
        //i passwords matched
        else{
            //create jwt token
            let token = jwt.sign({username:user.username},process.env.SECRET_KEY,{expiresIn:100})
            //send response
            res.send({message:"success",token:token,user:user})
        }
    }
}))








//routes for PUT req
userApp.put('/update-user/:id',expressAsyncHandler(async (req,res)=>{

    //get userId from url
    let userId = (+req.params.id)
    //get body from req
    let modifiedUser = req.body
    //find user by id
    // let indexOfUser = users.findIndex(userObj=>userObj.id===userId)
    // //if user not found
    // if(indexOfUser === -1){
    //     res.send({message:"No user found to modify"})
    // }
    // else{
    //     //index based updation
    //     users[indexOfUser] = modifiedUser
    //     //send res
    //     res.send({message:"User modified"})
    // }

    
        let usercollectionObj = req.app.get('usercollectionObj')

        await usercollectionObj.updateOne({id:{$eq:userId}},{$set:{...modifiedUser}})

        res.send({message:'User updated'})
    
    

}))










//routes for DELETE req
userApp.delete('/delete-user/:id',expressAsyncHandler(async (req,res)=>{

    let userId = (+req.params.id)
    
    //find user by id
    // let indexOfUser = users.findIndex(userObj=>userObj.id===userId)
    // //if user not found
    // if(indexOfUser === -1){
    //     res.send({message:"No user found to delete"})
    // }
    // else{
    //     users.splice(indexOfUser,1)
    //     //send res
    //     res.send({message:"User deleted"})
    // }

    // try{
        let usercollectionObj = req.app.get('usercollectionObj')

        await usercollectionObj.deleteOne({id:{$eq:userId}})

        res.send({message:'User deleted'})
    // }
    // catch(err){
    //     res.send({message:'Error',payload:err.message})
    // }

}))

module.exports = userApp
