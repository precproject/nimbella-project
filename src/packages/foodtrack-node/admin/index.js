var Admin = require('./admin.dao');
var Store = require('./store.dao');
var connectToDatabase = require('./db');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validation = require('./validation');


function verifyUser(token, secret) {
    try {
        return jwt.verify(token, secret)
    }
    catch (e) {
        return '';
    }
}

function generateToken(payload, secret, expiry) {
    return jwt.sign(payload, secret);
}


async function addUser(params) {
    try {

        var admin = {
            username: params.username,
            password: params.password,
            role: params.role
        };

        if (params.storeid)
            admin.store = params.storeid;

        var shop;
        if (params.store) {
            params.store.username = params.username;
            shop = await Store.create(params.store);
            if (shop._id)
            admin.store = shop._id;

        }
 
        var user = await Admin.addAccount(admin);
        mongoose.disconnect();

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: {
                message: "Account added successfully",
                user: user
            }
        };
    }
    catch (error) {
        mongoose.disconnect();
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: { error: error, message: "Error While Adding Beneficiary" }
        }
    }
}

async function loginUser(params) {

    try {

        var admin = {}
        if (params.username)
            admin.username = params.username;
        if (params.password)
            admin.password = params.password;

        console.log(admin);
        var user = await Admin.login(admin)
        console.log(user);
        mongoose.disconnect();

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: {
                user: user, message: "Valid User",
            }
        };
    }
    catch (error) {
        mongoose.disconnect();
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: { error: error, message: "Error Logging" }
        }
    }
}

async function loginU(params) {

    try {

        var admin = {}
        if (params.username)
            admin.username = params.username;
        var password = params.password;

        var user = await Admin.login(admin)
        console.log(password);
        console.log(user[0].password)
        console.log(user[0].password == password)

        if (user[0].password == password) {
            admin.role = user[0].role
            admin.store = user[0].store
            admin.id = user[0]._id
            admin.created = user[0].createdAt

            let token = generateToken(admin, secretKey, expiry)
            console.log(admin);
            mongoose.disconnect();
            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: {
                    user: admin, message: "Valid User", jwt: token
                }
            };
        }
        else {
            return {
                statusCode: 401,
                headers: { 'Content-Type': 'application/json' },
                body: {
                    message: "Not Valid User"
                }
            };
        }


    }
    catch (error) {
        mongoose.disconnect();
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: { error: error, message: "Error Logging" }
        }
    }
}

async function distributeFoodToStore(params) {

    try {

        var id = params.id;
        var transactions = params.transactions;


        //{ _id: req.params.id, aadhar: req.params.aadhar }
        var store = await Store.addFood({ _id: params.id }, transactions)
        mongoose.disconnect();

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: {
                store: store, message: "Food Distributed to Store",
            }
        };
    }
    catch (error) {
        mongoose.disconnect();
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: { error: error, message: "Error While Adding Beneficiary" }
        }
    }
}

async function updateUser(params) {

    try {

        var admin = params.user;

        var user = await Admin.update({ username: params.id }, admin);
        mongoose.disconnect();

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: {
                user: user, message: "User Updated successfully",
            }
        };
    }
    catch (error) {
        mongoose.disconnect();
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: { error: error, message: "Error While Adding Beneficiary" }
        }
    }
}

async function deleteUser(params) {

    try {

        var user = await Admin.delete({ username: params.id });
        mongoose.disconnect();

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: {
                user: user, message: "User Deleted successfully",
            }
        };
    }
    catch (error) {
        mongoose.disconnect();
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: { error: error, message: "Error While Adding Beneficiary" }
        }
    }
}


async function deleteAllUser(params) {

    try {

        var user = await Admin.deleteAll();
        mongoose.disconnect();

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: {
                user: user, message: "All User Deleted successfully",
            }
        };
    }
    catch (error) {
        mongoose.disconnect();
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: { error: error, message: "Error While Adding Beneficiary" }
        }
    }
}



async function main(params) {

    try {

        connectToDatabase();

        // GET CALLS
        if (params.__ow_method == "get") {
            if (params.__ow_path == "/login") {
                var login = loginUser(params);
                return login;
            }
        }

        // POST CALLS
        if (params.__ow_method == "post") {
            if (params.__ow_path == "/addUser") {
                return addUser(params);
            };
            if (params.__ow_path == "/login") {
                var login = loginU(params);
                return login;
            }
        }

        // PUT CALLS
        if (params.__ow_method == "put") {
            if (params.__ow_path == "/account") {
                return updateUser(params);
            };
            if (params.__ow_path == "/distribute") {
                return distributeFoodToStore(params);
            };
        }

        // DELETE CALLS
        if (params.__ow_method == "delete") {
            if (params.__ow_path == "/account") {
                return deleteUser(params);
            }
            if (params.__ow_path == "/all") {
                return deleteAllUser(params);
            }
        }

    }
    catch (error) {
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: { error: error }
        }
    }
}


exports.main = main;
