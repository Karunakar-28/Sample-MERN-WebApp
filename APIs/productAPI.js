const exp = require('express')
const productApp = exp.Router()

const expressAsyncHandler = require('express-async-handler')


//products data
let products = [
    {
        id:101,
        name:'TV',
        price:'150000'
    }
]




//routes for products

//get all products
productApp.get('/get-products',expressAsyncHandler(async (req,res)=>{
    //send response
    // res.send({message:"All products data",payload:products})
    let productcollectionObj = req.app.get('productcollectionObj')

        let productArray = await productcollectionObj.find().toArray()
        res.send({message:'All users',payload:productArray})
    
        res.send({message:'Error',payload:err.message})
}))

//get product by productId
productApp.get('/get-product/:id',expressAsyncHandler(async (req,res)=>{
    //get the id
    let productId  = (+req.params.id)
    //find the product with that id
    // let product = products.find(obj=>obj.id===productId)
    // //conditions
    // if(product===undefined){
    //     res.send({message:'Product not found'})
    // }
    // else{
    //     res.send({message:'Product found',payload:product})
    // }

    let productcollectionObj = req.app.get('productcollectionObj')
   
        let product = await productcollectionObj.findOne({id:{$eq:productId}})
        res.send({message:'Product details',payload:product})
    
    
}))


















//create product
productApp.post('/create-product',async (req,res)=>{
    //get new product from req body
    let newProduct = req.body
    //add this product to the products
    // products.push(newProduct)
    // res.send({message:'New product added'})

    let productcollectionObj = req.app.get('productcollectionObj')
    try{

        //naive approach
        // let allProducts = await productcollectionObj.find().toArray()
        // let names = allProducts.map(obj=>obj.name)
        // // console.log(names)
        // let x = names.find(name=>name===newProduct.name)
        // if(x !== undefined){
        //     res.send({message:'Name already exists'})
        // }
        // else{
        //     await productcollectionObj.insertOne(newProduct)
        //     res.send({message:'Product inserted'})
        // }

        //better approach
        let isPresent = await productcollectionObj.findOne({name:{$eq:newProduct.name}})

        if(isPresent?.name == newProduct.name){
            res.send({message:'Name already exists'})
        }
        else{
            await productcollectionObj.insertOne(newProduct)
            res.send({message:'Product inserted'})
        }
    }
    catch(err){
        res.send({message:'Error',payload:err.message})
    }

})










//update product
productApp.put('/update-product/:id',async (req,res)=>{
    
    //get id of the product to be modified
    let productId = (+req.params.id)
    //get modified data from body
    let modifiedProduct = req.body
    //find index of product with productId
    // let indexOfProduct = products.findIndex(obj=>obj.id===productId)
    // if(indexOfProduct===-1){
    //     res.send({message:'Product id not found'})
    // }
    // else{
    //     products[indexOfProduct]=modifiedProduct
    //     res.send({message:'Product updated'})
    // }

    let productcollectionObj = req.app.get('productcollectionObj')
    try{
        await productcollectionObj.updateOne({id:{$eq:productId}},{$set:{...modifiedProduct}})
        res.send({message:'Product updated'})
    }
    catch(err){
        res.send({message:'Error',payload:err.message})
    }
})









//delete product
productApp.delete('/delete-product/:id',async (req,res)=>{
    //get id of the product to be deleted
    let productId = (+req.params.id)
    
    //find index of product with productId
    // let indexOfProduct = products.findIndex(obj=>obj.id===productId)
    // if(indexOfProduct===-1){
    //     res.send({message:'Product id not found'})
    // }
    // else{
    //     products.splice(indexOfProduct,1)
    //     res.send({message:'Product deleted'})
    // }

    let productcollectionObj = req.app.get('productcollectionObj')
    try{
        await productcollectionObj.deleteOne({id:{$eq:productId}})
        res.send({message:'Product deleted'})
    }
    catch(err){
        res.send({message:'Error',payload:err.message})
    }
})

module.exports = productApp
