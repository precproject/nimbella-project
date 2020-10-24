var Store = require('./store.dao');
var connectToDatabase = require('./db');
const mongoose = require('mongoose');


async function addShop(params) {
    try {
        var store = {
            name: params.name,
            state: params.state,
            town: params.town,
            city: params.city,
            address: params.address,
            contact: params.contact
        };

        if (!params.name) {
            console.log("No Info");
        } else {
            var c;

            var shop = await Store.create(store);
            mongoose.disconnect();

            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: {
                    message: "Store created successfully",
                    store: shop
                }
            };
        }

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

function addFood() {
}

async function addBeneficiary(params) {
    var store = params.store;
    var beneficiary = params.beneficiary;
    //

    var shop = await Store.addBeneficiary({ _id: store }, beneficiary);
    mongoose.disconnect();
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
            message: "Beneficiary added successfully",
            shop: shop
        }
    };

}

async function getShops(params) {
    var shop = await Store.get();
    mongoose.disconnect();
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: { store: shop }
    };
}

async function getShop(params) {
    var shop = await Store.search({ _id: params.id });
    mongoose.disconnect();
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: { store: shop }
    };
}

async function count(params) {
    var query = {};
    if (params.state)
        query.state = params.state;
    var shop = await Store.count(query);
    mongoose.disconnect();
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: { store: shop }
    };
}

async function searchShop(params) {

    var store = {}
    if (params.name)
        store['name'] = params.name;
    if (params.state)
        store.state = params.state;
    if (params.town)
        store.town = params.town;
    if (params.city)
        store.city = params.city;
    if (params.username)
        store.username = params.username;

    var shop = await Store.search(store);
    mongoose.disconnect();
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: { store: shop }
    };

}

function getFoodStock() {
}

async function updateShop(params) {

    var data = params.shop;
    //
    var store = {}
    if (data.name)
        store['name'] = data.name;
    if (data.state)
        store.state = data.state;
    if (data.town)
        store.town = data.town;
    if (data.city)
        store.city = data.city;
    if (data.address)
        store.address = data.address;
    if (data.contact)
        store.contact = data.contact;
    if (data.username)
        store.username = data.username;

    var shop = await Store.update({ _id: params.id }, store);
    mongoose.disconnect();
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: { store: shop }
    };

}

function updateFood() {
}

async function deleteShop(params) {

    var id = params.id;

    var shop = await Store.delete({ _id: id })
    mongoose.disconnect();
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: { message: "Store deleted successfully", store: shop }
    };

}

async function deleteAllUser(params) {

    try {

        var user = await Store.deleteAll();
        mongoose.disconnect();

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: {
                shops: user, message: "All Shops Deleted successfully",
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

        // dbURL = "mongodb+srv://" + mongocred.username + ":" + mongocred.password + "@cluster0.oc00k.mongodb.net/" + mongocred.database + "?retryWrites=true&w=majority";
        // await mongoose.connect(dbURL, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true });

        connectToDatabase();

        // GET CALLS
        if (params.__ow_method == "get") {
            if (params.__ow_path == "/getShops") {
                return getShops(params);
            }
            if (params.__ow_path == "/getShop") {
                return getShop(params);
            }
            if (params.__ow_path == "/getFoodStock") {
                return getFoodStock(params);
            }
            if (params.__ow_path == "/count") {
                return count(params);
            }
        }

        // POST CALLS
        if (params.__ow_method == "post") {
            if (params.__ow_path == "/addShop") {
                return addShop(params);
            }
            if (params.__ow_path == "/addFood") {
                return addFood(params);
            }
            if (params.__ow_path == "/searchShop") {
                return searchShop(params);
            }
        }

        // PUT CALLS
        if (params.__ow_method == "put") {
            if (params.__ow_path == "/updateShop") {
                return updateShop(params);
            }
            if (params.__ow_path == "/updateFood") {
                return updateFood(params);
            }
            if (params.__ow_path == "/addBeneficiary") {
                return addBeneficiary(params);
            }
        }

        // DELETE CALLS
        if (params.__ow_method == "delete") {
            if (params.__ow_path == "/deleteShop") {
                return deleteShop(params);
            }
            if (params.__ow_path == "/deleteAll") {
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
