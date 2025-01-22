const mongoose = require('mongoose');
const CategoriesSchema = mongoose.Schema({
    title: String,
    placement: String,
    is_active: Boolean,
    created_by: mongoose.Types.ObjectId, //USERDAN GELEN İD

},{
    versionKey: false,
    timestamp : {
        createAt: "created_at",
        updateAt: "update_at",
    }
});
class Categories extends mongoose.Model {

};

CategoriesSchema.loadClass(Categories);
const categories = mongoose.model('categories', CategoriesSchema);
module.exports = categories
