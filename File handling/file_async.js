// void type
const fs = require('fs')

fs.writeFile('./test2.txt', "Learning Node.js Asynchronous", (err) => {})

fs.readFile('./contacts.txt',"utf-8", (err,result) => {
  if(err){
    console.log("Error : ", err)
  } else console.log(result)
})

