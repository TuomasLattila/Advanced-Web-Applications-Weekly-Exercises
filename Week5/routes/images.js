var express = require("express");
var router = express.Router();
const Image = require("../models/Image")
const multer  = require('multer')
const upload = multer()

router.post("/", upload.array('images'), async function(req, res, next) {
    try {
        let idList = []
        for (let i= 0; i<req.files.length; i++) {
            const newImage = new Image({
                buffer: req.files.buffer,
                mimetype: req.files.mimetype, 
                name: req.files.originalname,
                encoding: req.files.encoding
            })
            idList.push(((await newImage.save())._id).toString())
        }
        res.json({ ids: idList })
    } catch (error) {
        return next(error);
    }
})

module.exports = router;