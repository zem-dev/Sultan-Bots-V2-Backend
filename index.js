require("dotenv").config()

const express = require("express")
const app = express()

const PORT = 3001

app.use(express.json())

const mongoose = require("mongoose")
const URL = `mongodb+srv://admin:${process.env.PASSWORD}@cluster0.rysgmn3.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(URL).then((res) => {
    console.log("connected to database")
}).catch((err) => {
    console.log(err)
})

const orderSchema = new mongoose.Schema({
    plan: String,
    description: String,
    email: String,
    date: String,
    isComplete: Boolean,
    id: Number
})

const Order = mongoose.model('Order', orderSchema)

app.get('/api/orders', (req, res) => {
    // retreive all orders
    Order.find({}).then((result) => {
        res.json(result)
    })

})

app.get('/api/orders/:orderId', (req, res) => {
    // retreive specific order
    Order.find({id: req.params.orderId}).then((result) => {
        res.json(result)
    })
})

app.post('/api/orders', (req, res) => {
    // post order
    order = new Order({
        plan: req.body.plan,
        description: req.body.description,
        email: req.body.email,
        date: Date(),
        isComplete: req.body.isComplete,
        id: Date.now()
    })
    
    order.save().then(
        (result) => {
            console.log("order saved")
        }
    )
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})