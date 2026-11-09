const users = require('./MOCK_DATA.json')
const fs = require('fs')
const express = require('express')
const { error } = require('console')
const PORT = 8000
const app = express()

// Middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())

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
// Routes

// Route -> /api/users
app.route('/api/users')
.get((req,res) => {
  return res.json(users)
})
// .post((req,res) => {
//   // Add a user
//   const body = req.body
//   users.push({id: users.length + 1, ...body})
//   fs.writeFile('./MOCK_DATA.json', JSON.stringify(users),(err,data)=>{
//     return res.json({status: "Success",  id: users.length})
//   })
// })
.post((req, res) => {
  const body = req.body

  // 1. Generate a new unique ID (e.g., taking the last user's ID + 1, or using Date.now())
  const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1

  // 2. Create the new user object combining the new ID and the incoming body data
  const newUser = { id: newId, ...body }

  // 3. Push the new user into your array
  users.push(newUser)

  // 4. Save the updated array to your JSON file
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: "Failed to save user" })
    }

    // 5. Respond with status 201 (Created) and the newly created user
    return res.status(201).json({ 
      status: "Success", 
      newUser: newUser 
    })
  })
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
  const id = Number(req.params.id) // id associated with the user object
  
  // 1. Find the index of the user in the array
  const userIndex = users.findIndex(user => user.id === id)

  // 2. Check if user actually exists
  if (userIndex === -1) {
    return res.status(404).json({ status: "Error", message: "User not found" })
  }

  // 3. Update the specific user at that index - completely update (only id will remain same)
  users[userIndex] = { id: id, ...req.body } 

  // 4. Save to file and send back the updated user
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users,null,2), (err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: "Failed to update file" })
    }
    
    // Return success along with the specific updated user object
    return res.json({ 
      status: "Success", 
      updatedUser: users[userIndex] 
    })
  })
})

.patch((req,res) => {
  const id = Number(req.params.id) // id associated with the user object
  
  // 1. Find the index of the user in the array
  const userIndex = users.findIndex(user => user.id === id)

  // 2. Check if user actually exists
  if (userIndex === -1) {
    return res.status(404).json({ status: "Error", message: "User not found" })
  }

  // 3. Update the specific user at that index
  users[userIndex] = { ...users[userIndex], ...req.body }
   // hame purana data bilkul he udana nhi h kyuki ham "patch" i.e. partial update. so writting 2 spread op like this only replaces the fields where the entity is same (if only email is their in the req body than only email will be updated) 

  // 4. Save to file and send back the updated user
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users,null,2), (err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: "Failed to update file" })
    }
    
    // Return success along with the specific updated user object
    return res.json({ 
      status: "Success", 
      updatedUser: users[userIndex] 
    })
  })
})

.delete((req,res) => {
  // delete the user
  const id = Number(req.params.id)
  const userIndex = users.findIndex(user => user.id === id)

  if(id == -1){
    return res.status(404).json({status: "error", message: "User does not exist"})
  }

  users.splice(userIndex,1) // To delete

  fs.writeFile("./MOCK_DATA.json",JSON.stringify(users,null,2), (err) => {
    if(err) return res.status(500).json({status: "error", message: "Failed to update file"})

    return res.json({
      status:"Success",
      message: `user with userID ${id} has been removed`
    })
  })
})


app.listen(PORT, ()=>console.log(`Chal gya bhaiya server ${PORT} pr`))

