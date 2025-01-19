// const {MongoClient} = require('mongodb');
// let instance = null;
// class Database {
//     constructor(){
//         if (!instance) {
//             this.mongoConnection = null;
//             instance = this;
//         }
//         return instance;
//     }
//     async connect(option){
//         let db = await mongoose.connect(option.CONNECTION_STRING);
//         this.mongoConnection = db
//     }
// }
// module.exports = Database