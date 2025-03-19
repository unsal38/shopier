var express = require('express');
var router = express.Router();
router.post("/callback", async (req, res) =>{
    //https://www.tarzisahane.com/whatsapp/callback
    console.log(req.body, "callback router")
});
module.exports = router;