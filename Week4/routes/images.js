var express = require("express");
var router = express.Router();

router.post("/", function(req, res, next) {
    //console.log(req.body[0])
    res.json({ msg: "received" })
})

module.exports = router;