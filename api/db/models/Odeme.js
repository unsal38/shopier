const mongoose = require('mongoose');
const axios = require("axios")
const { send_message,db_message } = require("../../lib/whatsapp")
const OdemeSchema = new mongoose.Schema({
    name: String,
    surname: String,
    phone_number: String,
    email: String,
    check_eft_number: String,
    identityNumber: String,
    country: String,
    city: String,
    zipCode: String,
    registrationAddress: String,
    sozlesmeMesafeSatıs: Boolean,
    user_ip: String,
    created_by_user: mongoose.Types.ObjectId, //USERDAN GELEN İD
    product_item: Array, //
    eft_number: String,
    cargo_number: String,
    cargo_company: String,
    is_check_ok: { type: Boolean, default: false },
    iyzco_data: [],
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

OdemeSchema
    .pre("save", async function (next) {
        try {
            const data = { createAt: date }
            this.updateOne(data)
            const tel_number = this.phone_number
            const template = "siparischeck"
            const text = this._id
            await send_message(tel_number, template, text)
            next();
        } catch (error) {
            console.log(error)
        }
    }) // CREATEAT GÜNCELLEME İÇİN
    .pre(/^find/, async function (next) {
        try {
            const data = { updateAt: date }
            this.updateOne(data)
            next();
        } catch (error) {
            console.log(error)
        }
    }) // UPDATEAT GÜNCELLEME İÇİN
    
    

module.exports = mongoose.model('odeme', OdemeSchema);

