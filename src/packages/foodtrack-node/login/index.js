const validation = require('./validation');
const jwt = require('jsonwebtoken');

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

function main(params) {
    const secretKey = validation.secretKey;
    const expiry = validation.expiry;
    // ALL GET CALLS
    if (params.__ow_method == "get") {
        // CHECKS FOR USER ROLE
        if (params.__ow_path == "/auth") {
            let token = params.token;
            // IF NO TOKEN
            if (!token) {
                return {
                    statusCode: 403,
                    headers: { 'Content-Type': 'application/json' },
                    body: { "message": "Not Authorized Request" }
                };
            }
            else {
                let user = verifyUser(token, secretKey)
                if (user) {
                    return {
                        statusCode: 200,
                        headers: { 'Content-Type': 'application/json' },
                        body: { "message": "Authorized Request", "role": user.role, "token": token, "username": user.username, "store": user.store }
                    };
                }
                else {
                    return {
                        statusCode: 401,
                        body: { "message": "Not Authorized Request" }
                    }
                }

            }
        }
    }

    // ALL GET CALLS
    if (params.__ow_method == "post") {
        // CHECKS FOR USER ROLE
        if (params.__ow_path == "/auth") {
            let token = params.token;
            // IF NO TOKEN
            if (!token) {
                return {
                    statusCode: 403,
                    headers: { 'Content-Type': 'application/json' },
                    body: { "message": "Not Authorized Request" }
                };
            }
            else {
                let user = verifyUser(token, secretKey)
                if (user) {
                    return {
                        statusCode: 200,
                        headers: { 'Content-Type': 'application/json' },
                        body: { "message": "Authorized Request", "role": user.role, "token": token, "username": user.username, "store": user.store, "id": user.id }
                    };
                }
                else {
                    return {
                        statusCode: 401,
                        body: { "message": "Not Authorized Request" }
                    }
                }

            }
        }
        // LOGIN USER & GENERATE TOKEN
        if (params.__ow_path == "") {
            //let input = JSON.parse(params.__ow_body);

            let store = "";
            let username = params.username;
            let password = params.password;
            let role = params.role;
            let id = params.id;

            if (params.store)
                store = params.store;

            // CHECK USER IN DB
            let user = { username: username, role: role, store: store, id: id };

            //jwt.decode(token)
            // IF USER PRESENT GENERATE TOKEN 
            let token = generateToken(user, secretKey, expiry)

            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: { message: "Valid User", user: user, jwt: token }
            };
        }
    }
}
exports.main = main;
