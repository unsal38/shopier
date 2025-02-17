const mongoose = require('mongoose');
const CategoriesSchema = new mongoose.Schema({
    title: String,
    placement: String,
    is_active: Boolean,
    created_by: mongoose.Types.ObjectId, //USERDAN GELEN İD
    shopier_id: String

},{
    versionKey: false,
    timestamp : {
        createAt: "created_at",
        updateAt: "update_at",
    }
});
// class Categories extends mongoose.Model {

// };

// CategoriesSchema.loadClass(Categories);
module.exports = mongoose.model('categories', CategoriesSchema);

