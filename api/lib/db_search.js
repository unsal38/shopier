const mongoose = require("mongoose");

let userSchema = require("../db/models/Users");

async function find_by_id(user_id) {
   const user_data = await userSchema.findById(user_id)
    return user_data
}
module.exports={
    find_by_id
}