const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var adminModel = new Schema({
    name: {
        type: String,
        unique: false,
        required: false
    },
    username: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        unique: false,
        required: false
    },
    role: String,
    store: String
}, {
        timestamps: true
    }
    , { collection: 'ADMIN' });

module.exports = adminModel;