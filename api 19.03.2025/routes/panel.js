var express = require('express');
var router = express.Router();
const { all_product_database_save, all_categories_database_save } = require("../lib/shopier");
const { send_message } = require("../lib/whatsapp")
const jwt = require("../lib/jwt")
const { pane_params_get } = require("../controller/panel")
const { find_by_id_end_delete, find_by_id, findByIdAndUpdate } = require("../lib/db_search");

router.post("/youtubeLinkDelete", async (req, res) => {
  const product_id = req.body.product_id
  const youtube_video_link = null
  const update_data = { youtube_video_link }
  const update_check = await findByIdAndUpdate(product_id, update_data, "Product")
  if (update_check === true) res.send(true)
  if (update_check === false) res.send(false)
})
router.post("/youtubeLinkAdd", async (req, res) => {
  const product_id = req.body.product_id
  const youtube_video_link = req.body.youtube_video_link
  const update_data = { youtube_video_link }
  const update_check = await findByIdAndUpdate(product_id, update_data, "Product")
  if (update_check === true) res.send(true)
  if (update_check === false) res.send(false)
})
router.post("/favori", async (req, res) => {
  const user_id = req.body.data.user_id
  const data_db = await find_by_id(user_id, "Users")
  if (data_db) {
    const new_product_data_array = new Array()
    const product_id = data_db.favorite
    for (let index = 0; index < product_id.length; index++) {
      const element = product_id[index];
      const product_data = await find_by_id(element, "ProductSepet")
      // console.log(product_data)
      if (product_data === null) {
        update_favorite()
      }
      if (product_data !== null) { new_product_data_array.push(product_data) }

    }
    async function update_favorite() {
      const product_data_array_id = new Array()
      for (let index = 0; index < new_product_data_array.length; index++) {
        const element = new_product_data_array[index]._id;
        product_data_array_id.push(element)
      }
      const update_data = {
        favorite: product_data_array_id
      }
      await findByIdAndUpdate(user_id, update_data, "Users")
    }

    res.json({
      success: true,
      user_id: user_id,
      data: new_product_data_array
    })
  }
})
router.post("/searchProduct", async (req, res) => {
  const product_id = req.body.data.product_id
  const product_data = await find_by_id(product_id, "ProductSepet")
  if (product_data === null || "null") {
    var product_img_url = "/images/logo.jpeg"
    const product_title = "Ürün kaldırılmıştır."
    const product_fiyat = "0"
    var data = {
      product_img_url,
      product_title,
      product_fiyat,
    }
  }
  if (product_data !== null) {
    const product_img_url = product_data.media[0].url
    const product_title = product_data.title
    const product_fiyat = product_data.price_data.discountedPrice
    var data = {
      product_img_url,
      product_title,
      product_fiyat,
    }
  }


  res.json({ success: true, data })
})
router.post("/odemeActiveChange", async (req, res) => {
  const odeme_id = req.body.data.odeme_id
  const is_check_ok = req.body.data.onay_red
  const check = await findByIdAndUpdate(odeme_id, { is_check_ok }, "Odeme")
  if (is_check_ok === true) {
    const data = await find_by_id(odeme_id, "Odeme")
    const tel_number = data.phone_number
    const template = "odemecheck"
    const text = data._id
    await send_message(tel_number, template, text)
  }
  if (check === true) res.json({ success: true })
  if (check === false) res.json({ success: false })
})
router.post("/userDataChange", async (req, res) => {
  const user_id = req.id
  const target = req.body.data.target_name
  const target_data = req.body.data.target_data
  if (target === "first_name") { var data = { first_name: target_data } }
  if (target === "last_name") { var data = { last_name: target_data } }
  if (target === "phone_number") { var data = { phone_number: target_data } }

  const check = await findByIdAndUpdate(user_id, data, "Users")
  res.json({ success: check })
})
function jwt_user_id(authorization_token) {
  if (authorization_token) {
    const authorization_split = authorization_token.split("Bearer ")[1]
    const jwt_data = jwt.jwt_verify_access(authorization_split)
    return jwt_data.id
  }

}
router.post("/categoriesDelete", async (req, res) => {
  const delete_catagoriy_id = req.body.delete_id
  const check_db_id = await find_by_id(delete_catagoriy_id, "Categories")
  if (check_db_id) {
    const check = await find_by_id_end_delete(delete_catagoriy_id, "Categories")
    console.log(delete_catagoriy_id, check)
    res.send(true)
  }
  if (!check_db_id) res.send(false)
})
router.post("/deleteProduct", async (req, res) => {
  const product_id = req.body.product_id
  const check = await find_by_id_end_delete(product_id, "Product")
  if (check === true) res.send(true)
  if (check === false) res.send(false)
})
router.post("/whatsapp", async (req, res) => {
  const data_success = req.body.success
  const tel_number = req.body.tel_number
  const template = req.body.template
  const text = req.body.text
  if (data_success === true) {
    const check = await send_message(tel_number, template, text)

    const check_message = check.messages[0].message_status
    if (check_message === "accepted") res.json({ success: true })
  }
})
router.post("/kargo", async (req, res) => {
  async function check_data_and_whatsupp(odeme_id) {
    try {
      const data_odeme = await find_by_id(odeme_id, "Odeme")
      const cargo_company = data_odeme.cargo_company
      const cargo_number = data_odeme.cargo_number
      if (cargo_company.length > 0 && cargo_number.length > 0) {

        /////////   BİLGİLENDİRME 
        // text_body = kişi ad soyad
        // text_body1 = ödeme id
        // text_body2 = kargo firması
        // text_body3 = kargo takip numrası

        /////////
        const tel_number = data_odeme.phone_number
        const template = "kargoteslim"
        const text = "kargo"
        const text_body = data_odeme.name
        const text_body1 = odeme_id
        const text_body2 = data_odeme.cargo_company
        const text_body3 = data_odeme.cargo_number
        await send_message(tel_number, template, text, text_body,text_body1,text_body2,text_body3) 
      }
    } catch (error) { console.log(error, "panel js router") }
  }
  const parametre = req.body.data.parametre
  if (parametre === "cargo_company") {
    const id = req.body.data.odeme_id
    const cargo_company = req.body.data.deger
    const update_data = { cargo_company }
    const check = await findByIdAndUpdate(id, update_data, "Odeme")
    check_data_and_whatsupp(id)
    if (check === true) res.send(true)
    if (check === false) res.send(false)
  }
  if (parametre === "cargo_number") {
    const id = req.body.data.odeme_id
    const cargo_number = req.body.data.deger
    const update_data = { cargo_number }
    const check = await findByIdAndUpdate(id, update_data, "Odeme")
    check_data_and_whatsupp(id)
    if (check === true) res.send(true)
    if (check === false) res.send(false)
  }
})
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
  const check = await all_product_database_save(user_id)
  res.send(true)
});
router.get('/:page', pane_params_get);
router.get('/', pane_params_get);
module.exports = router;
