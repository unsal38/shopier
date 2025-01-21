const mongoose = require('mongoose');
const schema = mongoose.Schema({
    level: String,
    email: String, // USERDAN GELEN 
    location: String, 
    proc_type: String,
    log: String,

},{
    versionKey: false,
    timestamp : {
        createAt: "created_at",
        updateAt: "update_at",
    }
});
class Auditlogs extends mongoose.Model {

};

schema.loadClass(Auditlogs);
module.exports = mongoose.model('auditlogs', schema);