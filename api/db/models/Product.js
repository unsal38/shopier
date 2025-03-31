const mongoose = require('mongoose');
const productschema = mongoose.Schema({
    shopier_id: String,
    created_by: mongoose.Types.ObjectId, // USERDAN GELEN İD
    title: String,
    describe: String, // açıklamalar
    url: String, // shopier satış url
    media: Array,
    qrcode_data : String,
    price_data: {
        price: String,
        discount: Boolean,
        discountedPrice: String,
        shippingPrice: String,
    },
    stockStatus: String,
    stockQuantity: String,
    categories: Array,
    on_click: Number, // KAÇ KERE TIKLANDIĞI
    iyzco_data: Array,
////////////////////ÖRNEK İYZCO DATA ARRAY İÇERİĞİ ////////////////
// token: "AAEK3Q"
// 
// url: "https://sandbox.iyzi.link/AAEK3Q"
// 
// imageUrl: "https://sandbox-img.iyzi.link/AA/EK3Q.jpg
// ////////////////////ÖRNEK İYZCO DATA ARRAY İÇERİĞİ ////////////////
    is_active: {
        default: true,
        type: Boolean
    },
    options: Array,
    youtube_video_link: String,
    createAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: Date
}, {
    versionKey: false,
    timestamp: {
        createAt: "created_at",
        updateAt: "update_at",
    }
});
const date = Date.now()
//const intl_date = new Intl.DateTimeFormat("tr-TR").format(date)
productschema
.pre(/^find/, async function (next) {
    try {
        const data = { updateAt: date}
        this.updateOne(data)
        next();
    } catch (error) {
        console.log(error)
    }
})
.pre("save", async function (next) {
    try {
        const data = { createAt: date}
        this.updateOne(data)
        next();
    } catch (error) {
        console.log(error)
    }
})
module.exports = mongoose.model('products', productschema);