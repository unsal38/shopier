const axios = require('axios');
const { SHOPIER_CONNECT_KEY } = process.env.SHOPIER_CONNECT_KEY

// let categoriesSchema = require("../db/models/Categories");
// let userSchema = require("../db/models/Users");
let { create_db, find_one, findByIdAndUpdate } = require("../lib/db_search");

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
function all_product_database_save(created_by) {
  const options = {
    method: 'GET',
    url: 'https://api.shopier.com/v1/products?sort=dateDesc',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${SHOPIER_CONNECT_KEY}`
    },
  }
  return axios
    .request(options)
    .then(res => {
      try {
        const categori_data = res.data
        categori_data.forEach(async e => {
          const check_shopier_id = { shopier_id: e.id }
          const db_data = await find_one(check_shopier_id, "Product")
          if (db_data) {
            return
          } else {
            const data = {
              shopier_id: e.id,
              title: e.title,
              created_by,
              describe: e.describe,
              url: e.url,
              stockStatus: e.stockStatus,
              stockQuantity: e.stockQuantity,
              price_data: {
                price: e.priceData.price,
                discount: e.priceData.discount,
                discountedPrice: e.priceData.discountedPrice,
                shippingPrice: e.priceData.shippingPrice,
              },
              media: e.media,
              categories: e.categories,
              options: e.options
            }
            create(data, "Product")
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
};

/////NOT////////////////
// stockQuantity(*) ÜRÜN MİKTARI (NUMBER OLACAK)
///////////////////////
function product_create(price,title,description,imgurl1Array,stockQuantity,categoriesARRAY) {

  const options = {
    method: 'POST',
    url: 'https://api.shopier.com/v1/products',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${SHOPIER_CONNECT_KEY}`
    },
    data: {
      type: 'physical',
      priceData: { currency: 'TRY', price },
      shippingPayer: 'sellerPays',
      title,
      description,
      media: [
        { type: 'image', url: imgurl1Array[0] },
        { type: 'image', url: imgurl1Array[1] || null },
        { type: 'image', url: imgurl1Array[2] || null},
        { type: 'image', url: imgurl1Array[3] || null}
      ],
      stockQuantity,
      categories: [{ categoryId: categoriesARRAY[0] }]
    }
  };

  axios
    .request(options)
    .then(res => console.log(res.data))
    .catch(err => console.error(err));

}
  module.exports = {
    all_product_database_save,
    all_categories_database_save,
    product_create
  }
