var express = require('express');
var router = express.Router();

router.get('/',function (req, res, next) {
  const permissions = req.permissions
  res.render('index', { 
    permissions,
    javascript_file: "index.js",
    javascript_file1: "main.js",
    javascript_file2: "plugins.js"
  });
  
});

module.exports = router;
