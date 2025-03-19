const { find_by_id, find_db } = require("../lib/db_search");





async function index_get(req, res) {
  const permissions = req.permissions;
  const page_params = "index";
  const product_data = await find_db("Product")
  const blog_data = await find_db("Blog")
  const user_id = req.id
  if (user_id !== "null" && user_id !== undefined) {
    const user_data = await find_by_id(user_id, "Users")
    var user_favori = user_data.favorite
  }
  if (user_id === "null" || user_id === undefined) {
    var user_favori = null
  }
  res.render('index', {
    user_favori,
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