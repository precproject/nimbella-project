var mongoose = require('mongoose');
var adminModel = require('./admin.model');

adminModel.statics = {
    addAccount: function (data, cb) {
        var admin = new this(data);
        return admin.save(cb);
    },

    login: function (query, cb) {
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

    deleteAll: function (query, cb) {
        return this.deleteAll();
    }
}

Admin = mongoose.model('admin', adminModel, 'ADMIN');
module.exports = Admin;
