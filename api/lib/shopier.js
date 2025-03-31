const axios = require('axios');
require('dotenv').config()
const SHOPIER_CONNECT_KEY = process.env.SHOPIER_CONNECT_KEY
let {find_by_id, create_db, find_one, findByIdAndUpdate, find_by_id_end_delete } = require("../lib/db_search");

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
          if (db_data) { return } else {
            const data = {
              shopier_id: e.id,
              title: e.title,
              placement: e.placement,
              is_active: true,
              created_by
            }
            await create_db(data, "Categories")
          }
        });
        return true
      } catch (error) {
        console.log(error, "shopier js1")
        return false
      }
    })
    .catch(err => {
      console.error(err, "shopier js2")
      // return false
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
        const product_data = res.data
        product_data.forEach(async e => {
          const check_shopier_id = { shopier_id: e.id }
          const db_data = await find_one(check_shopier_id, "Product")
          if (db_data && db_data !== null) {
            const delete_id = db_data._id
            const check = await find_by_id_end_delete(delete_id, "Product")
            if(check === true){
              var data = {
                shopier_id: e.id,
                title: e.title,
                created_by,
                describe: e.description,
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
                options: e.options,
                youtube_video_link: db_data.youtube_video_link
              }
              await create_db(data, "Product")
            }
          }
          if (!db_data || db_data === null) {
            var data = {
              shopier_id: e.id,
              title: e.title,
              created_by,
              describe: e.description,
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
              options: e.options,
            }
            await create_db(data, "Product")
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
function product_create(price, title, description, imgurl1Array, stockQuantity, categoriesARRAY) {

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
        { type: 'image', url: imgurl1Array[2] || null },
        { type: 'image', url: imgurl1Array[3] || null }
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

async function product_change_stockQuantity(id, stockQuantity) {

  const options = {
    method: 'PUT',
    url: `https://api.shopier.com/v1/products/${id}`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${SHOPIER_CONNECT_KEY}`
    },
    data: { stockQuantity }
  };
  axios
    .request(options)
    .then(async res => {

      const find_shopier_id = await find_one({shopier_id: res.data.id},"Product")
      const product_id = find_shopier_id._id
      const stockQuantity = res.data.stockQuantity
      const update_data = {
        stockQuantity
      }
      await findByIdAndUpdate(product_id,update_data, "Product")
    })
    .catch(err => console.error(err));
}//// EKSİK YAPILACAK
async function odeme_yapildiginde(data) {
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const id = element.product_id
    const data_product = await find_by_id(id, "ProductSepet")
    const data_miktar = data_product.stockQuantity
    const sepet_miktar = element.product_miktar
    const sonuc_mik = Number(data_miktar) - Number(sepet_miktar)
    const shopier_id = data_product.shopier_id
    await product_change_stockQuantity(shopier_id,sonuc_mik)
  }
}
module.exports = {
  odeme_yapildiginde,
  product_change_stockQuantity,
  all_product_database_save,
  all_categories_database_save,
  product_create
}
