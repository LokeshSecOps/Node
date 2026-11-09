const fs = require('fs')

function logReqRes(filename){
  return (req,res,next) => { 
    req.userName = "LokeshSecOps"
    const date = new Date(Date.now()).toLocaleString(); 
    fs.appendFile(filename,`\n${date} : ${req.ip} ${req.method} : ${req.path}`, (err,data) => { 
      next()
    })
  }
}

module.exports = {
  logReqRes
}