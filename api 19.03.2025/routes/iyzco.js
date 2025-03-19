var express = require('express');
var router = express.Router();

const {callbackurl} = require("../controller/iyzco")


router.get('/callbackurl',callbackurl);

module.exports = router;
