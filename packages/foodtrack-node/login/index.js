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
            let token = params.username;
            let user;
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
                        body: { "message": "Authorized Request", "role": user.role, "token": token, "username": user.username }
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
        // LOGIN USER & GENERATE TOKEN
        if (params.__ow_path == "") {
            let input = JSON.parse(params.__ow_body);
            let username = input.username;
            let password = input.password;

            // CHECK USER IN DB
            let user = { username: username, role: "admin" };

            //jwt.decode(token)
            // IF USER PRESENT GENERATE TOKEN 
            let token = generateToken(user, secretKey, expiry)

            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json', 'jwt': token },
                body: { message: "You want to Login", username: input.username, password: input.password, jwt: token }
            };
        }
    }
}
exports.main = main;
