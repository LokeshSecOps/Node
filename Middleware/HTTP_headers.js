const users = require('./MOCK_DATA.json')
const express = require('express')
const PORT = 8000
const app = express()

app.use(express.urlencoded({extended : false}))


// Routes
app.route('/api/users')
.get((req,res) => {
  // Always add X to custom headers
  res.setHeader("X-my-Name","Lokesh Sharma")
  console.log(req.headers)
  return res.json(users.find(user => user.job_title === "SDE1"))
})


app.listen(PORT, ()=>console.log(`Chal gya bhaiya server ${PORT} pr`))

