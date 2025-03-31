var express = require('express');
var router = express.Router();
const { find_by_id, findByIdAndUpdate, find_filter, find_db } = require("../lib/db_search")
router.get("/:id",async function (req,res) {
    const page_params = "product"
    const permissions = req.permissions
    const catagory_data = await find_db("Categories")
    const product_id = req.params.id
    if(product_id) {var product_data = await find_by_id(product_id, "ProductSepet")}
    res.render('product_description', {
        product_data,
        catagory_data,
        permissions,
        page_params,
        javascript_file: null, // "login.js",
        javascript_file1: "token.js",
        javascript_file2: null,
        javascript_file3: null,
        javascript_file4: null
      });

})
module.exports = router;