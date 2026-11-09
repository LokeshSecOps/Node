const users = require('./MOCK_DATA.json')
const fs = require("fs")
const express = require('express')
const PORT = 8000
const app = express()

app.use(express.urlencoded({extended : false}))

app.use((req,res,next) => { // Middleware 2
  console.log("Hello from middleware 2",req.userName) // used name from previous middleware
  next()
})




















// Routes
app.get('/users',(req,res) => {
  const html = `
    <ul>
      ${users.map((user) => {
        return `<li> 
          ${user.first_name}
        </li>` // returning a string
      }).join('')}
    </ul>
  `

  res.send(html)
})

app.route('/api/users')
.get((req,res) => {
  return res.json(users)
})
.post((req,res) => {
  // Add a user
  return res.json({status: "Pending"})
})


// Route -> /api/users/:id
app.route('/api/users/:id')
.get((req,res) => {
  const id = Number(req.params.id) // typecasting bcoz its a string
  const user = users.find(user => user.id === id)
  return res.json(user)
})  
.put((req,res)=>{
  // Edit user with id
  return res.json({status : "pending"})
})
.patch((req,res) => {
  // Edit the details of the user
  return res.json({status : "pending"})
})
.delete((req,res) => {
  // delete the user
  return res.json({status : "pending"})
})


app.listen(PORT, ()=>console.log(`Chal gya bhaiya server ${PORT} pr`))

