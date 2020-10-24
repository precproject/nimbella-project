const mongoose = require('mongoose');
var foodModel = require('./food.model');

var Schema = mongoose.Schema;
var beneficiaryModel = new Schema({
    name: {
        type: String,
        unique: false,
        required: true
    },
    aadhar: {
        type: String,
        unique: true,
        required: true
    },
    shop: {
        type: String,
        unique: false,
        required: true
    },
    contact: {
        type: String,
        unique: false,
        required: false
    },
    age: Number,
    transactions: { type: [foodModel], default: undefined }

}, {
        timestamps: true
    }
    , { collection: 'BENIFICIARY' });

module.exports = beneficiaryModel;