const fs = require('fs')

console.log(1)
console.log(2)

fs.readFile('contacts.txt', 'utf-8', (err,result)=>{
  console.log(result)
})

console.log(3)
console.log(4)

// yhape ulta hua h, yhape program ruka nahi and phle 1,2,3 and 4 print hue fir file read hue.