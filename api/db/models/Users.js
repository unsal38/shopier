const mongoose = require('mongoose');
const schema = mongoose.Schema({
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true},
    is_active:  {type: Boolean, default: false},
    first_name: {type: String, lowercase: true},
    last_name: {type: String, lowercase: true},
    phone_number: {type: String, lowercase: true},
    favorite: Array,
},{
    versionKey: false,
    timestamp : {
        createAt: "created_at",
        updateAt: "update_at",
    }
});
class Users extends mongoose.Model {

};

schema.loadClass(Users);
module.exports = mongoose.model('users', schema);