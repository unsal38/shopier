var express = require('express');
var router = express.Router();

const shopier_api = require("../lib/shopier");
//const all_products = shopier_api.all_categories_database_save();

/* GET home page. */
var admin = true;
router.get('/', function (req, res, next) {
  if(admin === true)res.render('admin_panel', { title: 'Admin panel' });
  if(admin === false)res.render('user_panel', { title: 'User panel' });
  
});

module.exports = router;
