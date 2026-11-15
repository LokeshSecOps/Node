const express = require('express')
const { connectToMongoDB } = require('./connect')
const urlRoute = require('./routes/url')
const URL = require('./models/url')

const app = express()
const PORT = 8001

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(() => console.log('MongoDB connected'))

// Middleware
app.use(express.json())

// Route
app.use('/url',urlRoute)

app.listen(PORT, () => console.log(`Server has been started on ${PORT}`))
