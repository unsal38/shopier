var express = require('express');
var router = express.Router();
const { find_by_id, findByIdAndUpdate, find_filter, find_db } = require("../lib/db_search")
const jwt = require("../lib/jwt")

router.post("/productModal", async function (req, res) {
  const product_id = req.body.product_id
  const product_data = await find_by_id(product_id, "Product")
  if (product_data) {
    const product_data_media = product_data.media
    const product_data_youtube_video_link = product_data.youtube_video_link
    res.json({
      data: true,
      data_value_media: product_data_media,
      data_value_youtube_video_link: product_data_youtube_video_link
    })
  } else { res.json({ data: false }) }
})
router.post("/favori", async (req, res) => {
  const product_id = req.body.product_id
  const token_authorization = req.headers.authorization
  const token_jwt = token_authorization.split("Bearer ")[1]
  const token = jwt.jwt_verify_access(token_jwt)
  const user_id = token.id

  const data_user = await find_by_id(user_id, "Users")
  const user_favori = data_user.favorite
  // HİÇ YOKSA
  if (user_favori.length === 0) {
    const update_data = { favorite: product_id }
    const check = await findByIdAndUpdate(user_id, update_data, "Users")
    if (check === true) res.json({ success: true })
    if (check === false) res.json({ success: false })
  }
  // VARSA
  if (user_favori.length > 0) {
    const check_data = user_favori.filter(v => v === product_id)
    const new_array_favori = new Array()
    // AYNIYSA
    if (check_data.length > 0) return
    // AYNI DEĞİLSE
    if (check_data.length === 0) {
      for (let index = 0; index < user_favori.length; index++) {
        const element = user_favori[index];
        new_array_favori.push(element)
      }
      await new_array_favori.push(product_id)
      const update_data = { favorite: new_array_favori }
      const check = await findByIdAndUpdate(user_id, update_data, "Users")
      if (check === true) res.json({ success: true })
      if (check === false) res.json({ success: false })
    }
  }
})
router.post("/favori/sil", async (req, res) => {
  const product_id = req.body.product_id
  const token_authorization = req.headers.authorization
  const token_jwt = token_authorization.split("Bearer ")[1]
  const token = jwt.jwt_verify_access(token_jwt)
  const user_id = token.id

  const data_user = await find_by_id(user_id, "Users")
  const user_favori = data_user.favorite
  const new_data_array = new Array()

  for (let index = 0; index < user_favori.length; index++) {
    const element = user_favori[index];
    if (element !== product_id) new_data_array.push(element)
  }


  const update_data = { favorite: new_data_array }
  const check = await findByIdAndUpdate(user_id, update_data, "Users")
  if (check === true) res.json({ success: true })
  if (check === false) res.json({ success: false })
})
router.get('/', async function (req, res) {
  const permissions = req.permissions
  const page_params = "products"
  const filter_range_max = 20

  const filter_siralama = req.query.siralama || null
  const filter_page = req.query.page || 1
  const filter_maxprice = req.query.maxprice || null
  const filter_catagoriy = req.query.catagoriy

  if (filter_siralama === null) { var filter_sort_data_sirala = { "on_click": -1 } }
  if (filter_siralama === "favori") { var filter_sort_data_sirala = { "on_click": -1 } }
  if (filter_siralama === "fiyat") { var filter_sort_data_sirala = { "price_data.price": -1 } }

  if (filter_maxprice === null) { var filter_fiyat_range = "null" }
  if (filter_maxprice !== null) { var filter_fiyat_range = filter_maxprice }

  if (filter_catagoriy === "all" || filter_catagoriy === undefined) { var categori_id = "" }
  if (filter_catagoriy && filter_catagoriy !== "all") { var categori_id = req.query.catagoriy }
  ///// SAYFADA GÖSTERİLEN ÜRÜN SAYISI////////////
  ////////////////////////////////////////////////
  const limit = 10
  ///// SAYFADA GÖSTERİLEN ÜRÜN SAYISI////////////
  ////////////////////////////////////////////////
  const skip_value = (Number(filter_page) - 1) * Number(limit)

  const product_data_db = await find_filter("Product", filter_sort_data_sirala, filter_fiyat_range, skip_value, limit, categori_id)
  const product_data = product_data_db[0][0]
  const product_page_total = product_data_db[1][0]
  const catagory_data = await find_db("Categories")
  const product_data_length = product_page_total / limit

  const user_id = req.id
  if (user_id !== "null" && user_id !== undefined) {
    const user_data = await find_by_id(user_id, "Users")
    var user_favori = user_data.favorite
  }
  if (user_id === "null" || user_id === undefined) {
    var user_favori = null
  }

  res.render('products', {
    user_favori,
    product_data_length,
    filter_range_max,
    catagory_data,
    product_data,
    permissions,
    page_params,
    javascript_file: null, // "login.js",
    javascript_file1: "token.js",
    javascript_file2: null,
    javascript_file3: null,
    javascript_file4: null
  });
});
module.exports = router;