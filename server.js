const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Product = require('./models/productModel')
app.use(express.json())



app.get('/', (req,res)=>{
    res.send('jel;ssss')
})


app.get('/products', async (req,res)=>{
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


app.get('/products/:id', async(req,res)=>{
    try {
        const id = req.params.id
        const product = await Product.findById(id)
        res.json(product)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.post('/products', async (req,res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product) 
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})



app.put('/products/:id', async(req,res)=>{
    try {
        const id = req.params.id
        const product = await Product.findByIdAndUpdate(id, req.body)
        //if product does not exist with that specific id
        if(!product){
            return res.status(404).json({message:`cannot find any product with id: ${id}`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


//delete product

app.delete('/products/:id', async (req,res)=>{
    try {
        const id = req.params.id
        const product = await Product.findById(id)
        const deletedProduct = await Product.deleteOne(product)

        const updatedProducts = await Product.find()
        res.status(200).json(updatedProducts)
        
    } catch (error) {
        res.status(500).json({message: error.message})

    }
})






app.listen(5000, ()=>{
    console.log('server started on port 5000')
})


mongoose.connect('mongodb+srv://azaanzafar1610:Lol123lol786@cluster1.mvlmcie.mongodb.net/')
.then(()=>{
    console.log('connected to mongoDB')
}).catch((error)=>{
    console.log(error)
})