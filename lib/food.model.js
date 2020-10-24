const mongoose = require('mongoose');
const validator = require('validator');

var Schema = mongoose.Schema;
var foodModel = new Schema({
    id: Number,
    name: String,
    type: String,
    quantity: Number,
    date: { type: Date, default: Date.now }
});

module.exports = foodModel;