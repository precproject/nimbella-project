var mongoose = require('mongoose');
var beneficiaryModel = require('./beneficiary.model');

beneficiaryModel.statics = {
    addBeneficiary: function (data, cb) {
        var beneficiary = new this(data);
        return beneficiary.save(cb);
    },

    get: function (query, cb) {
        return this.find().limit(query.limit);
    },

    search: function (query, cb) {
        return this.find(query, cb);
    },

    update: function (query, updateData, cb) {
        return this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
    },

    addFood: function (query, updateData, cb) {
        return this.findOneAndUpdate(query, { $push: { transactions: updateData } }, { new: true }, cb);
    },

    delete: function (query, cb) {
        return this.findOneAndDelete(query, cb);
    },
    deleteAll: function (query, cb) {
        return this.deleteAll(query, cb);
    },
    count: function (query, cb) {
        return this.countDocuments(query, cb);
    }
}

Beneficiary = mongoose.model('beneficiary', beneficiaryModel, 'BENIFICIARY');
module.exports = Beneficiary;
