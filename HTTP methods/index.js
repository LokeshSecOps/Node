const fs = require('fs')
const http = require('http')
const url = require('url')

function myHandler(req,res){
  if(req.url === '/favicon.ico') return
  const date = new Date(Date.now()).toLocaleString();
  const log = `${date} : ${req.method} ${req.url} Request recieved\n`;
  const myUrl = url.parse(req.url, true);
  fs.appendFile('log.txt',log, (err,data)=>{
    switch(myUrl.pathname){
      case '/':
        if(req.method === 'GET') res.end("You are on HomePage")
        break
      case '/about':
        res.end("My name is Lokesh")
        break
      case '/contact-us':
        res.end("You can male me at - Mr.X@y.com")
        break
      case '/signup':
        if(req.method === 'GET') res.end('This is a sign up form')
        else if(req.method === 'POST'){
        // DB QUERY
        res.end("Success")
        }
        break
      default:
        res.end('Error 404 : Not found')
    }
  });
}

const myServer = http.createServer(myHandler);

myServer.listen(8000, console.log("Chal gya server"))