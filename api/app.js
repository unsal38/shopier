const express = require("express")
const database = require("../api/db/database")
const app = express()
var path = require('path');
require('dotenv').config()
const {permission_check} = require("../api/lib/token_check")

////ROUTER ///////////////////////////
const indexRouter = require('./routes/index');
const panelRouter = require('./routes/panel');
const loginRouter = require('./routes/login');
const blogRouter = require('./routes/blog');
const productsRouter = require('./routes/products');
const tokengenerator = require('./routes/token_generator');
//////</ROUTER////////////////////////

//VİEW ENGİNE SETUP //////////////////
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const port = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//</VİEW ENGİNE SETUP //////////////////

app.use("/",permission_check(["visitor","user", "admin"]), indexRouter)

app.listen(port, ()=> {
    console.log(`app listen port:${port}`)
    database
})