var express = require('express');
var router = express.Router();
const axios = require('axios');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { SHOPIER_CONNECT_KEY } = require("../config");

let categoriesSchema = require("../db/models/Categories");
let userSchema = require("../db/models/Users");


router.post("/generator", (req, res) => {
    const instance = axios.create({
        baseURL: 'https://api.shopier.com/v1',
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${SHOPIER_CONNECT_KEY}`
        }
    });


    const tokengenerator = instance.post("/generator")
        .then(async res => {
            console.log(res.data);
        })
        .catch(err => {
            console.error(err);
        });
})

module.exports = router;

