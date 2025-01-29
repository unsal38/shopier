const mongoose = require('mongoose');
const schema = mongoose.Schema({
    rol_id: {type: ObjectId, required: true}, // ROLES GELEN İD
    user_id: {type: ObjectId, required: true}, // USERS GELEN İD
},{
    versionKey: false,
    timestamp : {
        createAt: "created_at",
        updateAt: "update_at",
    }
});
class User_Roles extends mongoose.Model {

};

schema.loadClass(User_Roles);
module.exports = mongoose.model('user_roles', schema);