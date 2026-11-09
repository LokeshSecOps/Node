const User = require('../Models/user')

async function handleGetAllUsers(req,res){
  const allDBusers = await User.find({})
  return res.json(allDBusers)
}

async function handleCreateNewUser(req, res){
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
  
  return res.status(201).json({msg : "Success", id: result._id})
}

async function handleGetUserById(req,res){
  const user = await User.findById(req.params.id)
  const id = Number(req.params.id)
  return res.json(user)
}

async function handleUpdateUserById(req,res){
  await User.findByIdAndUpdate(req.params.id, {lastName: 'Changed'})
  return res.json({msg : "Success"})
}

async function handleDeleteUserById(req,res){
  await User.findByIdAndDelete(req.params.id)
  return res.json({status: "Success"})
}

async function handlePutUserById(req,res){
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
}

module.exports = {
  handleGetAllUsers,
  handleCreateNewUser,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handlePutUserById
}