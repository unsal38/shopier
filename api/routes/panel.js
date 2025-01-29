var express = require('express');
var router = express.Router();
const db_search = require("../lib/db_search")
const shopier_api = require("../lib/shopier");
const {
  pane_params_get
} = require("../controller/panel")
//const all_products = shopier_api.all_categories_database_save();

/* GET home page. */



router.post("/users", (req, res) => {
  const email = res.data.email
  const password = res.data.password
  const first_name = res.data.first_name
  const last_name = res.data.last_name
  const phone_number = res.data.phone_number

  // const data = userSchema.create({
  //     email: email,
  //     password: password,
  //     is_active: true,
  //     first_name: first_name,
  //     last_name: last_name,
  //     phone_number: phone_number,
  // })
});

router.get("/categoriesAdd", (req, res, next) => {

  let categories_save = shopier_api.all_categories_database_save

  categories_save
    .then(value => {
      if (value === true) {
        res.json({ categories_save: true });
      } else { res.json({ categories_save: false }) }
    })


});
router.get("/productAdd", (req, res, next) => {

  //shopier_api.all_product_database_save();
});

router.get('/:page', pane_params_get);
router.get('/', pane_params_get);
module.exports = router;
