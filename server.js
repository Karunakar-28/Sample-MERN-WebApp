//create express appln

const exp = require('express')
const app = exp()

const path = require('path')

//connect react build with http server
app.use(exp.static(path.join(__dirname,'./build/')))

//dotenv
require('dotenv').config()

//mongo client
const mClient = require('mongodb').MongoClient

//get db url
const dburl = process.env.DATABASE_URL

//connect to database
mClient.connect(dburl)
.then(client=>{
    //get database obj
    let dbObj = client.db("appdata1")

    //get collection obj
    let usercollectionObj = dbObj.collection("usercollection")
    //get product collection obj
    let productcollectionObj = dbObj.collection("productcollection")

    //share to userApi
    app.set("usercollectionObj",usercollectionObj)
    //share to productAPi
    app.set("productcollectionObj",productcollectionObj)

    console.log("Database connection successful")
})
.catch(err=>console.log("Error in database connect",err))

//add body parser
app.use(exp.json())

//import apis

const userApp = require('./APIs/userAPI')
const productApp = require('./APIs/productAPI')

//approach-3
// let middleware3 = (req,res,next)=>{
//     console.log("Middleware - 3 executed")
//     next()
// }
// app.use("/users",middleware3,userApp)

//execute specific apis based on the request
app.use("/users",userApp)
app.use("/products",productApp) 

//dealing with invalid paths
app.use('**',(req,res,next)=>{
    res.send({message:"Invalid path"})
})

//error handler
app.use((err,req,res,next)=>{
    res.send({message:err.message})
})

//assign port number
const port = 4000
app.listen(port,()=>console.log(`Server listening on port ${port}`))