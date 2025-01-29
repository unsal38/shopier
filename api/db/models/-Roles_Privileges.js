const mongoose = require('mongoose');
const schema = mongoose.Schema({
    rol_id: {type: ObjectId, required: true}, // ROLES GELEN İD
    permission: {type: String, required: true}, 
    created_by: {type: ObjectId, required: true}, // USER GELEN İD
},{
    versionKey: false,
    timestamp : {
        createAt: "created_at",
        updateAt: "update_at",
    }
});
class Roles_Privileges extends mongoose.Model {

};

schema.loadClass(Roles_Privileges);
module.exports = mongoose.model('roles_privileges', schema);