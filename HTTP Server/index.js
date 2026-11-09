const http = require('http')
const fs = require('fs')
const { url } = require('inspector')


const myServer = http.createServer((req,res) => {
  const date = new Date(Date.now()).toLocaleString()
  const log = `${date}: ${req.url} New req recieved\n`
  fs.appendFile('log.txt',log, (err,data) => {
    switch(req.url){
      case '/': res.end("You are on Homepage")
      break
      case '/about': res.end("Tumhe kya jan na h")
      break
      case '/contact-us': res.end("You can call me X.. Mr.X")
      break
      case '/terms': res.end("Jiyo or jeene do")
      break
      default: res.end("Error 404 : not found")
    }
  })
})

myServer.listen(8000, () => console.log("Server Started")) 