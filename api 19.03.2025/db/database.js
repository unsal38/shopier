const mongoose = require('mongoose');
require('dotenv').config()

/////env içerisine dahil edilecek
const url = process.env.URL
/////env içerisine dahil edilecek

mongoose.connect(url,{
    dbName: process.env.DB_NAME
})
.then(() => {console.log('Connected! mongoose')})