var express = require('express');
var router = express.Router();
const db_search = require("../lib/db_search")
const shopier_api = require("../lib/shopier");
const jwt = require("../lib/jwt")
const { pane_params_get } = require("../controller/panel")


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

router.get("/categoriesAdd", async (req, res) => {
  const authorization_token = req.headers.authorization
  const authorization_split = authorization_token.split("Bearer ")[1]
  const jwt_data = jwt.jwt_verify_access(authorization_split)
  const user_id = jwt_data.id
  const shopier_kategori = await shopier_api.all_categories_database_save(user_id)
  if (shopier_kategori === true) res.send(true)
  if (shopier_kategori === false) res.send(false)

});
router.get("/productAdd", (req, res, next) => {

  //shopier_api.all_product_database_save();
});

router.get('/:page', pane_params_get);
router.get('/', pane_params_get);
module.exports = router;
