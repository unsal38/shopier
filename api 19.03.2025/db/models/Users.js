const mongoose = require('mongoose');
const Usersschema = mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String },
    is_active: { type: Boolean, default: false },
    first_name: { type: String, lowercase: true },
    last_name: { type: String, lowercase: true },
    phone_number: { type: String, lowercase: true },
    admin: { type: Boolean, default: false },
    favorite: Array,
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
Usersschema.pre(/^find/, async function (next) {
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

// class Users extends mongoose.Model {

// };

// schema.loadClass(Users);
module.exports = mongoose.model('users', Usersschema);