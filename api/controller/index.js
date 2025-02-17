
let blogSchema = require("../db/models/Blog");
let productSchema = require("../db/models/Product");
async function index_get(req, res) {
    const permissions = req.permissions;
    const page_params = "index";
    const product_data = await productSchema.find();
    const blog_data = await blogSchema.find();
    
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