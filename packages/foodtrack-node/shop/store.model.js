const mongoose = require('mongoose');
const foodModel = require('./food.model.js');

var Schema = mongoose.Schema;
var storeModel = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    state: {
        type: String,
        unique: false,
        required: true
    },
    town: {
        type: String,
        unique: false,
        required: false
    },
    city: {
        type: String,
        unique: false,
        required: false
    },
    address: {
        type: String,
        unique: false,
        required: false
    },
    contact: {
        type: String,
        unique: false,
        required: false
    },
    beneficiary: { type: [String], default: undefined },
    transactions: { type: [foodModel], default: undefined }

}, {
        timestamps: true
    }
    , { collection: 'SHOP_KEEPER' });

module.exports = storeModel;