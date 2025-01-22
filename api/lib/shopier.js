const shopier = require("shopier-api");
const axios = require('axios');
const { SHOPIER_CONNECT_KEY } = require("../config")

const instance = axios.create({
    baseURL: 'https://api.shopier.com/v1',
    headers: {
        accept: 'application/json',
        authorization: `Bearer ${SHOPIER_CONNECT_KEY}`}
  });


function all_product_database_save() {
   instance.get("/products")
   .then(res => console.log(res.data))
   .catch(err => console.error(err));
}
function all_categories_database_save() {
    instance.get("/categories")
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
 }
module.exports = {
    all_product_database_save,
    all_categories_database_save
}
