var express = require('express');
var router = express.Router();
const {index_get} = require("../controller/index")
router.get("/", index_get);
module.exports = router;
