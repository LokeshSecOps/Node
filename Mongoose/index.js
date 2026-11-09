const fs = require('fs')
const express = require('express')
const { error, timeStamp } = require('console')
const PORT = 8000
const app = express()
const mongoose = require('mongoose')
const { type } = require('os')

// Connection
mongoose.connect('mongodb://127.0.0.1:27017/DATABASE')
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log('Mongo error', err))

// Schema 
const userSchema = new mongoose.Schema({
  // Structure
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  jobTitle: {
    type: String
  },
  gender: {
    type: String,
    required: true
  }
}, {timestamps: true}
);

// Model
const User = mongoose.model('user', userSchema)







app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/users', async(req,res) => {
  const allDBusers = await User.find({})
  const html = `
    <ul>
      ${allDBusers.map((user) => {
        return `<li> 
          ${user.firstName} - ${user.email}
        </li>`
      }).join('')}
    </ul>
  `

  res.send(html)
})

app.route('/api/users')
.get(async(req,res) => {
  const allDBusers = await User.find({})
  return res.json(allDBusers)
})
.post(async(req, res) => {
  const body = req.body

  if(
    !body || !body.firstName || !body.lastName || !body.email ||
    !body.gender || !body.jobTitle
  ){
    return res.status(400).json({msg: "ALl field are required..."})
  }

  const result = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
    jobTitle: body.jobTitle
  })
  
  return res.status(201).json({msg : "Success"})
})

app.route('/api/users/:id')
.get(async(req,res) => {
  const user = await User.findById(req.params.id)
  const id = Number(req.params.id)
  return res.json(user)
})  

.put((req,res)=>{
  const id = Number(req.params.id) 
  
  const userIndex = users.findIndex(user => user.id === id)

  if (userIndex === -1) {
    return res.status(404).json({ status: "Error", message: "User not found" })
  }

  users[userIndex] = { id: id, ...req.body } 

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users,null,2), (err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: "Failed to update file" })
    }
    
    return res.json({ 
      status: "Success", 
      updatedUser: users[userIndex] 
    })
  })
})

.patch(async(req,res) => {
  await User.findByIdAndUpdate(req.params.id, {lastName: 'Changed'})
  return res.json({msg : "Success"})
})

.delete(async(req,res) => {
  await User.findByIdAndDelete(req.params.id)
  return res.json({status: "Success"})
})

app.listen(PORT, ()=>console.log(`Chal gya bhaiya server ${PORT} pr`))