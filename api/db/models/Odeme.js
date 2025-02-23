const mongoose = require('mongoose');
const OdemeSchema = new mongoose.Schema({
    name: String,
    surname: String,
    phone_number:String,
    email:String,
    product_id: String,
    eft_number: String,
    cargo_number: String,
    cargo_company: String,
    is_check_ok: {type: Boolean, default: false},
    created_by: mongoose.Types.ObjectId, //USERDAN GELEN İD

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
module.exports = mongoose.model('odeme', OdemeSchema);