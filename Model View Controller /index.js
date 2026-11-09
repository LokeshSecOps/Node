// 1. IMPORTS & DEPENDENCIES
const express = require('express')
const { connectMongoDb } = require('./connection')
const { logReqRes } = require('./middlewares')
const userRouter = require('./routes/user')

// 2. APP INITIALIZATION
const app = express()
const PORT = 8000

// 3. DATABASE CONNECTION
connectMongoDb('mongodb://127.0.0.1:27017/DATABASE')

// 4. GLOBAL MIDDLEWARES (Must be placed BEFORE routes)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(logReqRes("log.txt")) // Custom request logger

// 5. ROUTES (Mounted AFTER body parsers)
app.use('/users', userRouter)

// 6. SERVER LISTENER
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))