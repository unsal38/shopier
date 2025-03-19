var express = require('express');
var router = express.Router();
router.get('/', (req, res) => {
    const permissions = req.permissions;
    const page_params = "sozlesmeler";
    res.render('sozlesmeler', {
        permissions,
        page_params,
        javascript_file: null,
        javascript_file1: null,
        javascript_file2: null,
        javascript_file3: null,
        javascript_file4: "../javascripts/token.js"
    });
});
module.exports = router;