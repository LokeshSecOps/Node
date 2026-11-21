const express = require('express')
const { connectToMongoDB } = require('./connect')
const path = require('path') //
const urlRoute = require('./routes/url')
const staticRouter = require('./routes/staticRouter')
const URL = require('./models/url')

const app = express()
const PORT = 8001

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(() => console.log('MongoDB connected'))

app.set('view engine','ejs') //
app.set('views',path.resolve('./views')) //

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Route
app.use('/url',urlRoute)
app.use('/',staticRouter)


app.listen(PORT, () => console.log(`Server has been started on ${PORT}`))
