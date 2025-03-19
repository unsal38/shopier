const express = require("express")
const database = require("../api/db/database")
const app = express()
var path = require('path');
const {permission_check,authorization_check} = require("../api/lib/token_check")
const {PORT} = require("../api/config")
////ROUTER ///////////////////////////
const indexRouter = require('./routes/index');
const panelRouter = require('./routes/panel');
const loginRouter = require('./routes/login');
const blogRouter = require('./routes/blog');
const productsRouter = require('./routes/products');
const sepetRouter = require('./routes/sepet');
const tokengenerator = require('./routes/token_generator');
const iyzcoRouter = require("./routes/iyzco")
const sozlesmelerRouter = require("./routes/sozlesmeler")
const whatsappRouter = require("./routes/callback")
//////</ROUTER////////////////////////

//VİEW ENGİNE SETUP //////////////////
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//</VİEW ENGİNE SETUP //////////////////

app.post("*", authorization_check())
app.use("/iyzco", iyzcoRouter)
app.use("/tokengenerator", tokengenerator)
app.use('/login',permission_check(["visitor", "admin"]), loginRouter);
app.use("/panel",permission_check(["user", "admin"]), panelRouter);
app.use('/blog',permission_check(["visitor", "admin", "vizitor"]), blogRouter);
app.use("/products",permission_check(["visitor","user", "admin"]), productsRouter)
app.use("/sepet",permission_check(["visitor","user", "admin"]), sepetRouter)
app.use("/sozlesmeler",permission_check(["visitor","user", "admin"]), sozlesmelerRouter)
app.use("/whatsapp", whatsappRouter)
app.use("/",permission_check(["visitor","user", "admin"]), indexRouter)

app.listen(PORT, ()=> {
    console.log(`app listen port:${PORT}`)
    database
})