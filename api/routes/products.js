var express = require('express');
var router = express.Router();
const db_search = require("../lib/db_search")

router.post("/productModal", async function (req, res) {
  const product_id = req.body.product_id
  const product_data = await db_search.find_by_id(product_id, "Product")
  
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

  const product_data_db = await db_search.find_filter("Product", filter_sort_data_sirala, filter_fiyat_range, skip_value, limit, categori_id)
  const product_data = product_data_db[0][0]
  const product_page_total = product_data_db[1][0]
  const catagory_data = await db_search.find_db("Categories")
  const product_data_length = product_page_total / limit
  res.render('products', {
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