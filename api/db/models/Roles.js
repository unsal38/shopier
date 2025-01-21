const mongoose = require('mongoose');
const schema = mongoose.Schema({
    role_name: String,
    is_active: {type: Boolean, default: false},
    create_by: {
        type: mongoose.SchemaTypes.ObjectId, // USERS GELEN İD
        required: true,
    }
},{
    versionKey: false,
    timestamp : {
        createAt: "created_at",
        updateAt: "update_at",
    }
});
class Roles extends mongoose.Model {

};

schema.loadClass(Roles);
module.exports = mongoose.model('roles', schema);