const shopier = require("shopier-api");
const axios = require('axios');
const mongoose = require("mongoose");
const { SHOPIER_CONNECT_KEY } = require("../config")

let categoriesSchema = require("../db/models/Categories");
let userSchema = require("../db/models/Users");


const instance = axios.create({
    baseURL: 'https://api.shopier.com/v1',
    headers: {
        accept: 'application/json',
        authorization: `Bearer ${SHOPIER_CONNECT_KEY}`
    }
});


// const all_categories_database_save = instance.get("/categories")
//     .then(async res => {

//         // const data = categoriesSchema.create({
//         //     title: "deneme2",
//         //     placement: 1,
//         //     is_active: true,
//         // })

//         // const data = await categoriesSchema.find()





//         //  if (res) return true;
//     })
//     .catch(err => {
//         console.error(err);
//         if (err) return err
//     });

function all_product_database_save() {
    // instance.get("/products")
    //     .then(res => console.log(res.data))
    //     .catch(err => console.error(err));
}

module.exports = {
    all_product_database_save,
    // all_categories_database_save
}
