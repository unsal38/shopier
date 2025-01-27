var express = require('express');
var router = express.Router();

router.get('/',function (req, res, next) {
  const permissions = req.permissions
  res.render('index', { 
    title: 'Ana Sayfa', 
    permissions,
    javascript_file: "index.js"
  });
  
});

module.exports = router;
