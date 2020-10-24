var mongoose = require('mongoose');
var storeModel = require('./store.model');

storeModel.statics = {
    create: function (data, cb) {
        var store = new this(data);
        return store.save(cb);
    },

    get: function (query, cb) {
        return this.find(query, cb);
    },

    search: function (query, cb) {
        return this.find(query, cb);
    },

    update: function (query, updateData, cb) {
        return this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
    },

    delete: function (query, cb) {
        return this.findOneAndDelete(query, cb);
    },

    addBeneficiary: function (query, updateData, cb) {
        return this.findOneAndUpdate(query, { $push: { beneficiary: updateData } }, { new: true }, cb);
    },

    addFood: function (query, updateData, cb) {
        return this.findOneAndUpdate(query, { $push: { transactions: updateData } }, { new: true }, cb);
    },
    deleteAll: function (query, cb) {
        return this.deleteAll(query, cb);
    },
    count: function (query, cb) {
        return this.countDocuments(query, cb);
    }
}

Store = mongoose.model('store', storeModel, 'SHOP_KEEPER');
module.exports = Store;