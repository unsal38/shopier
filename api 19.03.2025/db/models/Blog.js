const mongoose = require('mongoose');
const schema = mongoose.Schema({
    created_by: mongoose.Types.ObjectId, // user gelen id
    title: String,
    body: String, // metin gövdesi sonradan bak
    url: String,
    image: String,
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
schema
    .pre(/^find/, async function (next) {
        try {
            const data = { updateAt: date }
            this.updateOne(data)
            next();
        } catch (error) {
            console.log(error)
        }
    })
    .pre("save", async function (next) {
        try {
            const data = { createAt: date }
            this.updateOne(data)
            next();
        } catch (error) {
            console.log(error)
        }
    })

module.exports = mongoose.model('blog', schema);