const mongoose = require('mongoose');
const mongocred = require('./mongocred');

var Beneficiary = require('./beneficiary.dao');
var Store = require('./store.dao');


async function addBeneficiary(params) {
    try {
        var beneficiary = {
            name: params.name,
            shop: params.store,
            aadhar: params.aadhar,
            contact: params.contact
        };
        var beneficiary = await Beneficiary.addBeneficiary(beneficiary);
        mongoose.disconnect();
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: { beneficiary: beneficiary, message: "Success Added Beneficiary" }
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

async function beneficiary(params) {
    try {
        var limit = 10;
        if (params.limit)
            limit = params.limit;
        var beneficiary = await Beneficiary.get(limit);
        mongoose.disconnect();
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: { beneficiary: beneficiary }
        };
    }
    catch (error) {
        mongoose.disconnect();
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: { error: error, message: "Error Retrieving Beneficiary" }
        }
    }
}

async function searchBeneficiary(params) {
    try {
        var query = params.beneficiary;
        var beneficiary = await Beneficiary.search(query);
        mongoose.disconnect();
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: { beneficiary: beneficiary }
        };
    }
    catch (error) {
        mongoose.disconnect();
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: { error: error, message: "Error Retrieving Beneficiary" }
        }
    }
}

async function distributeFoodToBeneficiary(params) {
    try {
        var id = params.id;
        var transactions = params.transactions;

        //{ _id: req.params.id, aadhar: req.params.aadhar }
        var beneficiary = await Beneficiary.addFood({ aadhar: id }, transactions);
        mongoose.disconnect();
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: { beneficiary: beneficiary, message: "Succesfully Distributed Food to Beneficiary" }
        };
    }
    catch (error) {
        mongoose.disconnect();
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: { error: error, message: "Error Distributing Food to Beneficiary" }
        }
    }
}

async function updateBeneficiary(params) {
    try {
        var beneficiary = params.beneficiary;
        var result = await Beneficiary.update({ aadhar: params.id }, beneficiary);
        mongoose.disconnect();
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: { beneficiary: result, message: "Succesfully Updated Beneficiary" }
        };
    }
    catch (error) {
        mongoose.disconnect();
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: { error: error, message: "Error Updating Beneficiary" }
        }
    }
}

async function deleteBeneficiary(params) {
    try {
        var id = params.id;
        var beneficiary = await Beneficiary.delete({ aadhar: id });
        mongoose.disconnect();
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: { beneficiary: beneficiary, message: "Succesfully Deleted Beneficiary" }
        };
    }
    catch (error) {
        mongoose.disconnect();
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: { error: error, message: "Error Deleting Beneficiary" }
        }
    }
}



async function deleteAllUser(params) {

    try {

        var user = await Beneficiary.deleteAll();
        mongoose.disconnect();

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: {
                beneficiary: user, message: "All Beneficiary Deleted successfully",
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

async function count(params) {
    var query = {};
    if (params.store)
        query.store = params.store;
    var shop = await Beneficiary.count(query);
    mongoose.disconnect();
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: { beneficiary: shop }
    };
}



async function main(params) {
    try {

        dbURL = "mongodb+srv://" + mongocred.username + ":" + mongocred.password + "@cluster0.oc00k.mongodb.net/" + mongocred.database + "?retryWrites=true&w=majority";
        await mongoose.connect(dbURL, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true });

        // GET CALLS
        if (params.__ow_method == "get") {
            if (params.__ow_path == "/beneficiary") {
                return beneficiary(params);
            }
            if (params.__ow_path == "/count") {
                return count(params);
            }
        }

        // POST CALLS
        if (params.__ow_method == "post") {
            if (params.__ow_path == "/addBeneficiary") {
                if (!params.aadhar) {
                    return {
                        statusCode: 403,
                        headers: { 'Content-Type': 'application/json' },
                        body: { message: "Missing Information" }
                    };
                } else {
                    return addBeneficiary(params);
                }
            };
            if (params.__ow_path == "/searchBeneficiary") {
                if (!params.beneficiary) {
                    return {
                        statusCode: 403,
                        headers: { 'Content-Type': 'application/json' },
                        body: { message: "Missing Information" }
                    };
                } else {
                    return searchBeneficiary(params);
                }
            }
        }

        // PUT CALLS
        if (params.__ow_method == "put") {
            if (params.__ow_path == "/distributeFood") {
                return distributeFoodToBeneficiary(params);
            };
            if (params.__ow_path == "/updateBeneficiary") {
                return updateBeneficiary(params);
            };
        }

        // DELETE CALLS
        if (params.__ow_method == "delete") {
            if (params.__ow_path == "/deleteBeneficiary") {
                return deleteBeneficiary(params);
            }
            if (params.__ow_path == "/deleteAll") {
                return deleteAllUser(params);
            }
        }

    }
    catch (error) {
        mongoose.disconnect();
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: { error: error }
        }
    }
}


exports.main = main;
