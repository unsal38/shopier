require('dotenv').config()
module.exports = {
    "AUTH_USER": process.env.AUTH_USER,
    "AUTH_PASS": process.env.AUTH_PASS,
    "NODEMAILER_SERVICE": process.env.NODEMAILER_SERVICE,
    "PORT": process.env.PORT || "3000",
    "SHOPIER_CONNECT_KEY": process.env.SHOPIER_CONNECT_KEY,
    "REFLESH_TOKEN": process.env.REFLESH_TOKEN,
    "ACCESS_TOKEN": process.env.ACCESS_TOKEN,
    "IYZCO_API_KEY" : process.env.IYZCO_API_KEY,
    "IYZCO_SECRET_KEY" : process.env.IYZCO_SECRET_KEY,
    "IYZCO_BASE_URL" : process.env.IYZCO_BASE_URL,
    "KRKART_KOMİSYON1": 5/100,
    "KRKART_KOMİSYON2": 25/100

}