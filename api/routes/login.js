var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const jwt_lib = require("../lib/jwt");

let userSchema = require("../db/models/Users");

router.post("/register", async (req, res) => {
  const pass_form_data = req.body.register_form_array[1][1]
  const pass_reflesh_token = jwt_lib.jwt_sign_reflesh({ pass: pass_form_data })
  await userSchema.create({
    email: req.body.register_form_array[0][1],
    password: pass_reflesh_token,
    first_name: req.body.register_form_array[2][1],
    last_name: req.body.register_form_array[3][1],
    phone_number: req.body.register_form_array[4][1]
  })
  res.send(true)
})
router.post("/login", async (req, res) => {
  const pass_form_data_email = req.body.register_form_array[0][1]
  const pass_form_data_pass = req.body.register_form_array[1][1]
  const pass_form_data_email_tolowercase = pass_form_data_email
    .replace(/İ/g, "i")
    .replace(/Ü/g, "ü")
    .replace(/Ö/g, "ö")
    .replace(/Ç/g, "ç")
    .toLowerCase()
  const pass_form_data_pass_tolowercase = pass_form_data_pass
    .replace(/İ/g, "i")
    .replace(/Ü/g, "ü")
    .replace(/Ö/g, "ö")
    .replace(/Ç/g, "ç")
    .toLowerCase()

  try {
    const user_data = await userSchema.find({ email: pass_form_data_email_tolowercase })
    if (user_data.length > 0) {
      const user = "user"
      const id = user_data[0]._id
      const new_jwt = jwt_lib.jwt_sign_access_cookie(user, id)
      res.json({jwt: new_jwt})
    }
    if (user_data.length === 0) res.json({message: "kullanıcı bulunamadı"})
  } catch (error) {
    console.log(error)
  }
})
router.get('/', function (req, res, next) {
  const permissions = req.permissions
  res.render('login', {
    title: 'login',
    permissions,
    javascript_file: "login.js"
  });
});

module.exports = router;
