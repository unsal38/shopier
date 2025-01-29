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
    var user_data = await userSchema.find({ email: pass_form_data_email_tolowercase })
    console.log(user_data)
    if (user_data.length > 0) {
      var password = jwt_lib.jwt_verify_reflesh(user_data[0].password)
      if (password.pass === pass_form_data_pass_tolowercase) var pass = true
      if (password.pass != pass_form_data_pass_tolowercase) var pass = false
    }

    if (user_data.length === 0 || pass === false) res.json({ message: "kullanıcı yada şifre hatalı" })
    if (user_data.length >= 0 && pass === true) {
      if(user_data[0].admin === true) var user = "admin"
      if(user_data[0].admin === false) var user = "user"
      const id = user_data[0]._id
      const new_jwt = jwt_lib.jwt_sign_access_cookie(user, id)
      const new_password_pass = {pass: password.pass}
      const new_reflesh_token = jwt_lib.jwt_sign_reflesh(new_password_pass)
      try {
        await userSchema.findByIdAndUpdate(id, {password: `${new_reflesh_token}`})
      } catch (error) {
        console.log(error, "login js login")
      }
      res.json({ jwt: new_jwt })
    }
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
