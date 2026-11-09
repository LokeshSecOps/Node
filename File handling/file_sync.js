const fs = require('fs')

// Synchronus call
fs.writeFileSync("./test1.txt", "Hey there")

const result = fs.readFileSync('./contacts.txt',"utf-8")

console.log(result)

fs.appendFileSync("./contacts.txt", new Date().getDate().toLocaleString())

fs.copyFileSync("./contacts.txt","./contacts2.txt")

fs.unlinkSync("./contacts2.txt") // to delete

console.log(fs.statSync("./test1.txt"))
console.log(fs.statSync("./test1.txt").isFile())
// fs.mkdirSync("Test Doc")
// fs.mkdirSync("Test Doc/file1/file2", {recursive: true})