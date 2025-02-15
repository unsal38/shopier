var express = require('express');
var router = express.Router();
const db_search = require("../lib/db_search");

router.get("/",async function (req, res) {
  const permissions = req.permissions;
  const page_params = "index";

  const blog_data = await db_search.find("Blog");
  const product_data = await db_search.find("Product");
  res.render('index', { 
    product_data,
    blog_data,
    permissions,
    page_params,
    javascript_file: "index.js",
    javascript_file1: null, // "main.js",
    javascript_file2: null, // "plugins.js",
    javascript_file3: null,
    javascript_file4: "../javascripts/token.js"
  });
  
});


module.exports = router;
