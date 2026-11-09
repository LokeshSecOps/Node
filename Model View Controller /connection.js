const mongoose = require('mongoose')

async function connectMongoDb(url){
  // Connection
  try{
    await  mongoose.connect(url)
    console.log("MongoDB connected")
  } catch(err) {
    console.log("Mongo err",err)
  }
}

module.exports = {
  connectMongoDb
}