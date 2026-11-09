// blocking req jo hoti h vo threads (local nokers and in a computer if we are making a project which has blcking codes/requests to by default 4 threads milti h.. ye jo h synchronously kam krti h and jb tk vo particular resolve na ho jaye tb tk aage ka kam ruk jata h) -> islie recommend kra jata h ki unsynchronous code / non blocking program likha jaye...


const fs = require('fs')

console.log('1')
console.log('2')
const result = fs.readFileSync('contacts.txt', 'utf-8')
console.log(result)
console.log('3')

// yhape kya hua na phle 1 print hua than 2 print hua than contact.txt jo h cat hua or uske bad 3 print hua... which represents that it is a blocking program that means it returns it output in between the code execution and further program has to wait until this request is fulfilled

