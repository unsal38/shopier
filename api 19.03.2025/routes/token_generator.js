var express = require('express');
var router = express.Router();
var jwt_lib = require("../lib/jwt")


router.get("/cookiecheck", (req, res) => {
    const data_check = req.headers.cookie
    const check_jwt = jwt_lib.jwt_verify_access(data_check)
    if (check_jwt === false) {
        const jwt_data = "visitor"
        const new_jwt = jwt_lib.jwt_sign_access_cookie(jwt_data)
        res.json({ new_jwt })
    }
})
router.get("/", (req, res) => {
    const jwt_data = "visitor"
    const new_jwt = jwt_lib.jwt_sign_access_cookie(jwt_data)
    res.json({ new_jwt })
})


module.exports = router;

