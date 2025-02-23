const db_search = require("../lib/db_search")
let blogSchema = require("../db/models/Blog");
let productSchema = require("../db/models/Product");
async function index_get(req, res) {
  const permissions = req.permissions;
  const page_params = "index";
  const product_data = await db_search.find_db("Product")
  const blog_data = await db_search.find_db("Blog")
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

}

module.exports = {
  index_get
}