var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const jwt_lib = require("../lib/jwt");
const nodemailer = require("../lib/nodemailler")
const bcrypt = require('bcrypt');

let userSchema = require("../db/models/Users");

router.post("/register", async (req, res) => {
  const pass_form_data = req.body.register_form_array[1][1]

  const saltRounds = 10;
  await bcrypt.hash(pass_form_data, saltRounds,async (err, hash) => {
    if(err) {
      console.log(err)
      return res.json({ success: false })
    }
    const pass_reflesh_token = jwt_lib.jwt_sign_reflesh({ hash })
    await userSchema.create({
      email: req.body.register_form_array[0][1],
      password: pass_reflesh_token,
      first_name: req.body.register_form_array[2][1],
      last_name: req.body.register_form_array[3][1],
      phone_number: req.body.register_form_array[4][1]
    })
    res.send(true)
  });
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
  try {
    var user_data = await userSchema.find({ email: pass_form_data_email_tolowercase })

    if (user_data.length > 0) {

      var password_hash = await jwt_lib.jwt_verify_reflesh(user_data[0].password)
      const validPassword = await bcrypt.compare(pass_form_data_pass,password_hash);
      if (validPassword) var pass = true
      if (!validPassword) var pass = false
    }
    
    if (user_data.length === 0 || pass === false) res.json({ message: "kullanıcı yada şifre hatalı" })
    if (user_data.length >= 0 && pass === true) {
      if (user_data[0].admin === true) var user = "admin"
      if (user_data[0].admin === false) var user = "user"
      const id = user_data[0]._id
      const new_jwt = jwt_lib.jwt_sign_access_cookie(user, id)
      const new_reflesh_token = jwt_lib.jwt_sign_reflesh(password_hash)
      try {
        await userSchema.findByIdAndUpdate(id, { password: `${new_reflesh_token}` })
      } catch (error) {
        console.log(error, "login js login")
      }
      res.json({ jwt: new_jwt })
    }
  } catch (error) {
    console.log(error)
  }
})
router.post("/updatepass", async (req, res) => {
  const forgetpass_email = req.body.data
  console.log(forgetpass_email)
  try {
    const user_check = await userSchema.findOne({ email: forgetpass_email })
    if (!user_check) res.json({ success: false, message: "email hatalı kontrol ediniz." })
    if (user_check) {
      const first_name = user_check.first_name
      const user_id = user_check.id
      const baseUrl = req.headers.origin
      const access_token_data = {
        user_id
      }
      const access_token = jwt_lib.jwt_sign_access(access_token_data)
      nodemailer.nodmail(first_name, access_token, baseUrl)
      res.json({ success: false, message: "email gelen kutunuzu ve gereksiz e posta kutunuzu kontrol ediniz." })
    }
  } catch (error) {
    if (error) {
      console.log(error)
      res.json({ success: false, message: "email hatalı kontrol ediniz." })
    }
  }
})
router.post("/passchange", async (req, res) => {
  try {
    const user_new_pass = req.body.data.data
    const token = req.headers.authorization
    const token_split = token.split("Bearer ")[1]
    const user_data = await jwt_lib.jwt_verify_access(token_split)
    const user_id = user_data.user.user_id
    const user_db_data = await userSchema.findById(user_id)

    if (!user_db_data) res.json({ success: false })
    if (user_db_data) {
      const saltRounds = 10;
      await bcrypt.hash(user_new_pass, saltRounds,async (err, hash) => {
        if(err) {
          console.log(err)
          return res.json({ success: false })
        }

        const password = await jwt_lib.jwt_sign_reflesh(hash)
        await userSchema.findByIdAndUpdate(user_id, { password: password, is_active: true })
        res.json({ success: true })

      });
    }

  } catch (error) {
    if (error) {
      console.log(error)
      res.json({ success: false })
    }
  }

})
router.get("/token/:accesstoken", (req, res) => {
  const permissions = "user"
  const page_params = "passchange"
  res.render('passchange', {
    permissions,
    page_params,
    javascript_file: null,
    javascript_file1: null,
    javascript_file2: null,
    javascript_file3: "../../javascripts/token.js",
    javascript_file4: "../../javascripts/login.js",
  });
})
router.get('/', function (req, res) {
  const permissions = req.permissions
  const page_params = "login"
  res.render('login', {
    permissions,
    page_params,
    javascript_file: "login.js",
    javascript_file1: "token.js",
    javascript_file2: null,
    javascript_file3: null,
    javascript_file4: null
  });
});

module.exports = router;
