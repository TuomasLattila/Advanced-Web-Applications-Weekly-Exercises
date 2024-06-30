var express = require("express")
var router = express.Router()
const category = require("../models/Category")

router.get("/all", async function(req, res, next) {
    try {
        const categoriesList = await category.find()
        if (categoriesList.length > 0) {
            res.json({categories: categoriesList})
        } else {
            res.json({categories: []})
        }
    } catch {
        return next()
    }
})

module.exports = router;