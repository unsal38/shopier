var express = require('express');
var router = express.Router();
const db_search = require("../lib/db_search")
const { all_product_database_save, all_categories_database_save } = require("../lib/shopier");
const jwt = require("../lib/jwt")
const { pane_params_get } = require("../controller/panel")
const { find_by_id_end_delete, find_by_id, findByIdAndUpdate } = require("../lib/db_search");

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
router.post("/categoriesDelete", async (req, res) => {
  const delete_catagoriy_id = req.body.delete_id
  const check_db_id = await find_by_id(delete_catagoriy_id, "Categories")
  if (check_db_id) {
    await find_by_id_end_delete(delete_catagoriy_id, "Categories")
    return res.send(true)
  }
  if (!check_db_id) return res.send(false)
})
async function update_data_function(product_id, youtube_video_link) {
  const update_data = { youtube_video_link: youtube_video_link } // {youtube_video_link: http://www.youtube.com/embed/5qJiIGlCmnM}
  const update_data_check = await findByIdAndUpdate(product_id, update_data, "Product")
  if (update_data_check === true) return true
  if (update_data_check === false) return false
}
router.post("/youtubeLinkDelete", async (req, res) => {
  const product_id = req.body.product_id
  const update_data = null
  const update_check = await update_data_function(product_id, update_data)
  if (update_check === true) res.send(true)
  if (update_check === false) res.send(false)
})
router.post("/youtubeLinkAdd", async (req, res) => {
  const product_id = req.body.product_id
  const update_data = req.body.youtube_video_link
  const update_check = await update_data_function(product_id, update_data)
  if (update_check === true) res.send(true)
  if (update_check === false) res.send(false)
})
function jwt_user_id(authorization_token) {
  if (authorization_token) {
    const authorization_split = authorization_token.split("Bearer ")[1]
    const jwt_data = jwt.jwt_verify_access(authorization_split)
    return jwt_data.id
  }

}
router.get("/categoriesAdd", async (req, res) => {
  const authorization_token = req.headers.authorization
  const user_id = jwt_user_id(authorization_token)
  const shopier_kategori = await all_categories_database_save(user_id)
  if (shopier_kategori === true) res.send(true)
  if (shopier_kategori === false) res.send(false)

});
router.get("/productAdd", async (req, res) => {
  const authorization_token = req.headers.authorization
  const user_id = await jwt_user_id(authorization_token)
  all_product_database_save(user_id)
  res.send(true)
  // if (shopier_product === true) res.send(true)
  // if (shopier_product === false) res.send(false)
});

router.get('/:page', pane_params_get);
router.get('/', pane_params_get);
module.exports = router;
