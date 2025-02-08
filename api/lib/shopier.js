const shopier = require("shopier-api");
const axios = require('axios');
const mongoose = require("mongoose");
const { SHOPIER_CONNECT_KEY } = require("../config")

let categoriesSchema = require("../db/models/Categories");
let userSchema = require("../db/models/Users");
let { create, find_one } = require("../lib/db_search")




function all_categories_database_save(created_by) {
  const options = {
    method: 'GET',
    url: 'https://api.shopier.com/v1/categories?limit=10&page=1&sort=asc',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${SHOPIER_CONNECT_KEY}`
    }
  };

  return axios
    .request(options)
    .then(res => {
      try {
        const categori_data = res.data
        categori_data.forEach(async e => {
          const check_shopier_id = { shopier_id: e.id }
          const db_data = await find_one(check_shopier_id, "Categories")
          if (db_data) {
            return
          } else {
            const data = {
              shopier_id: e.id,
              title: e.title,
              placement: e.placement,
              is_active: true,
              created_by
            }
            create(data, "Categories")
          }
        });
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    })
    .catch(err => {
      console.error(err)
      return false
    });

}

module.exports = {
  // all_product_database_save,
  all_categories_database_save
}
