const mongoose = require('mongoose');
const schema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    is_active:  {type: Boolean, default: false},
    first_name: String,
    last_name: String,
    phone_number: String,
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