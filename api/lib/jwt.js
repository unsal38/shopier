const jwt = require("jsonwebtoken");

const { REFLESH_TOKEN, ACCESS_TOKEN } = require("../config/index");

// JSON SİGN FUNCTİONS
const jwt_sign_access_cookie = function jwt_sign_access_cookie(jwt_data, id) {
    try {
        const jwt_data_sign = {
            user: jwt_data,
            id: id || null
        }
        return jwt.sign(jwt_data_sign, ACCESS_TOKEN, { expiresIn: '1h' })
    } catch (error) {
        console.log(error, "jwt_access error");
    }
    
}
const jwt_sign_access = function jwt_sign_access(jwt_data) {
    try {
        const jwt_data_sign = {
            user: jwt_data,
            id: id || null
        }
        return jwt.sign(jwt_data_sign, ACCESS_TOKEN, { expiresIn: '1h' })
    } catch (error) {
        console.log(error, "jwt_access error");
    }
    
}
const jwt_sign_reflesh = function jwt_sign_reflesh(jwt_data) {
    try {
        return jwt.sign(jwt_data, REFLESH_TOKEN, { expiresIn: '365 days' })
    } catch (error) {
        console.log(error, "jwt_reflesh error");
    }
    
}

// JSON SİGN FUNCTİONS
// JSON DECODER FUNCTİONS
const jwt_verify_access = function jwt_verify_access(token) {
    try {
        const check_token = token.match("Authorization")
        if(check_token) {var token_data = token.split("Authorization=Bearer ")[1]}
        if(check_token === null) {var token_data = token}
        var decoded__token = jwt.verify(token_data, ACCESS_TOKEN);
        return decoded__token
      } catch(err) {
        console.log(err.message, "jwt_verify_access error")
        return false;
      }
}
const jwt_verify_reflesh = function jwt_verify_reflesh(token) {
    try {
        const check_token = token.match("Authorization")
        if(check_token) {var token_data = token.split("Authorization=Bearer ")[1]}
        if(check_token === null) {var token_data = token}
        var decoded_reflesh_token = jwt.verify(token_data, REFLESH_TOKEN);
        return decoded_reflesh_token
      } catch(err) {
        console.log(err, "jwt_verify_reflesh error")
        return false;
      }
}
// JSON DECODER FUNCTİONS

module.exports = {
    jwt_sign_access_cookie,
    jwt_sign_access,
    jwt_sign_reflesh,
    jwt_verify_access,
    jwt_verify_reflesh
}