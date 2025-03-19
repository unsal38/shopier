const mongoose = require('mongoose');
const CategoriesSchema = new mongoose.Schema({
    title: String,
    placement: String,
    is_active: Boolean,
    created_by: mongoose.Types.ObjectId, //USERDAN GELEN İD
    shopier_id: String,
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
CategoriesSchema
    .pre(/^find/, async function (next) {
        try {
            const data = { updateAt: date }
            this.updateOne(data)
            next();
        } catch (error) {
            console.log(error)
        }
    })
    .pre("create", async function (next) {
        try {
            const data = { createAt: date }
            this.updateOne(data)
            next();
        } catch (error) {
            console.log(error)
        }
    })
// class Categories extends mongoose.Model {

// };

// CategoriesSchema.loadClass(Categories);
module.exports = mongoose.model('categories', CategoriesSchema);

