const mongoose = require('mongoose');
const Promise = require('bluebird');
const mongocred = require('./mongocred');

mongoose.Promise = global.Promise;

let isConnected;

module.exports = connectToDatabase = async () => {
    if (isConnected) {
        console.log('=> using existing database connection');
        return Promise.resolve();
    }

    console.log('=> using new database connection');
    dbURL = "mongodb+srv://" + mongocred.username + ":" + mongocred.password + "@cluster0.oc00k.mongodb.net/" + mongocred.database + "?retryWrites=true&w=majority";

    isConnected = await mongoose.connect(dbURL, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true });
    return isConnected;
};

/*
//export this function and imported by server.js
module.exports = function () {

    mongoose.connect(dbURL, { useNewUrlParser: true });

    mongoose.connection.on('connected', function () {
        //console.log(db.connected("Mongoose default connection is open to ", dbURL));
    });

    mongoose.connection.on('error', function (err) {
        //console.log(error("Mongoose default connection has occured " + err + " error"));
    });

    mongoose.connection.on('close', function () {
        //console.log(close("Mongoose default connection is disconnected"));
        console.log("disconnected")
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0)
        });
    });
}
*/