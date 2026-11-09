const http = require('http')
const fs = require('fs')
const url = require('url')

const myServer = http.createServer((req,res) => {
  if(req.url === "/favicon.ico") return res.end()
  const date = new Date(Date.now()).toLocaleString()
  const log = `${date}: ${req.url} New req recieved\n`
  const myUrl = url.parse(req.url, true)
  console.log(myUrl)
  fs.appendFile('log.txt',log,(err,data)=>{
    switch(myUrl.pathname){
      case '/': res.end("You are on Homepage")
      break
      case '/about': 
      const Name = myUrl.query.myname
      res.end(`Hello ${Name}`)
      break
      case '/contact-us': res.end("You can call me X.. Mr.X")
      break
      case '/terms': res.end("Jiyo or jeene do")
      break
      default: res.end("Error 404 : not found")
    }
  })
})

myServer.listen(8001, () => console.log("Server Started"))
