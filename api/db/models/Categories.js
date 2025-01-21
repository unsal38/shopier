const mongoose = require('mongoose');
const schema = mongoose.Schema({
    title: String,
    placement: String,
    is_active: Boolean,
    created_by: ObjectId, //USERDAN GELEN İD

},{
    versionKey: false,
    timestamp : {
        createAt: "created_at",
        updateAt: "update_at",
    }
});
class Categories extends mongoose.Model {

};

schema.loadClass(Categories);
module.exports = mongoose.model('categories', schema);