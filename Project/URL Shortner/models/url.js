const mongoose = require('mongoose');

const visitHistorySchema = new mongoose.Schema({
  timestamp: {type: String}
},{_id: false})

const urlSchema = new mongoose.Schema({
  shortID: {
    type: String,
    required: true,
    unique: true
  },
  redirectURL:{
    type: String,
    required: true
  },
  visitHistory: [visitHistorySchema]

}, {timestamps: true});

const URL = mongoose.model('url',urlSchema);

module.exports = URL; // exported model