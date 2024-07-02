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
                buffer: req.files[i].buffer,
                mimetype: req.files[i].mimetype, 
                name: req.files[i].originalname,
                encoding: req.files[i].encoding
            })
            idList.push(((await newImage.save())._id).toString())
        }
        res.json({ ids: idList })
    } catch (error) {
        return next(error);
    }
})

router.get("/:imageId", async function(req, res, next) {
    try {
        const image = await Image.findById(req.params.imageId)
        //console.log(image)
        if (image) {
            res.contentType(image.mimetype)
            res.appendHeader("content-disposition", "inline")
            res.send(image.buffer)
        } else {
            res.json({ body: null })
        }
    } catch (error) {
        return next(error)
    }
})

module.exports = router;