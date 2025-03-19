var express = require('express');
var router = express.Router();

const {blog_get} = require("../controller/blog")

router.get('/',blog_get);
router.get('/:page',blog_get);

module.exports = router;
