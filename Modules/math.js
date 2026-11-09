const add = (a,b)=>{
 return a + b;
}

const sub = (a,b)=>{
  return a-b;
}

// module.exports = { // default export
//   add, // named function
//   subFn: sub
// }

exports.multiply = (a,b)=>{ // anonymous function 
  return a*b
}