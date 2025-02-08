var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
  const permissions = req.permissions
  const page_params = "products"

  ///ÜRÜN LİSTELEME

  const see_product = "" // ürünlerden kaçtane gösterileceği
  const all_product = "" // ürünlerin kaçtane olduğu
  const product_page_number = " " // hangi sayfada olduğu
  const all_product_page_number = " " // toplam kaç sayfa olacağı

  ///ÜRÜN LİSTELEME


  res.render('products', {
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