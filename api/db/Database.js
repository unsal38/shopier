const mongoose = require('mongoose');
let instance = null;
class Database {
    constructor() {
        if (!instance) {
            this.mongoConnection = null;
            instance = this;
        }
        return instance;
    }
    async connect(option) {
        try {
            console.log("connecting...")
            let db = await mongoose.connect(option.CONNECTION_STRING);
            this.mongoConnection = db
            console.log("connected.")
        } catch (error) {
            console.error(error);
            process.exit(1);
        }

    }
}
module.exports = Database