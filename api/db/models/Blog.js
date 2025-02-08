const mongoose = require('mongoose');
const schema = mongoose.Schema({
    created_by: mongoose.Types.ObjectId, // user gelen id
    title: String, 
    body: String, // metin gövdesi sonradan bak
    url: String,
    image: String,
},{
    versionKey: false,
    timestamp : {
        createAt: "created_at",
        updateAt: "update_at",
    }
});
class Blog extends mongoose.Model {

};

schema.loadClass(Blog);
module.exports = mongoose.model('blog', schema);