const mongoose = require('mongoose');
const schema = mongoose.Schema({
    created_by: ObjectId, // USERDAN GELEN İD
    title: String,
    describe: String, // açıklamalar
    url: String, // shopier satış url
    media: Array,
    price_data: {
       price : String, 
       discount: Boolean,
       discountedPrice: String,
       shippingPrice: String,
    },
    stockStatus: String,
    stockQuantity: String,
    categories: Array,
    on_click: Number,
},{
    versionKey: false,
    timestamp : {
        createAt: "created_at",
        updateAt: "update_at",
    }
});
class Product extends mongoose.Model {

};

schema.loadClass(Product);
module.exports = mongoose.model('product', schema);