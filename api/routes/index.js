var express = require('express');
var router = express.Router();

router.get('/',function (req, res, next) {
  const permissions = req.permissions
  const page_params = "index"
  res.render('index', { 
    permissions,
    page_params,
    javascript_file: "index.js",
    javascript_file1: "main.js",
    javascript_file2: "plugins.js",
    javascript_file3: null,
    javascript_file4: "../javascripts/token.js"
  });
  
});

module.exports = router;
