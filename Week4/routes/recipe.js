var express = require('express');
var router = express.Router();
var recipeList = require('../recipeList')

router.get("/:food", function(req, res, next) {
    let recipeFound = false;
    for (let i = 0; i < recipeList.length; i++) {
        if (recipeList[i].name == req.params.food) {
            res.json({
                name: req.params.food,
                instructions: recipeList[i].instructions,
                ingredients: recipeList[i].ingredients
            })
            recipeFound = true;
            break
        }
    }
    if (recipeFound == false) {
        res.json({
            name: req.params.food,
            instructions: [],
            ingredients: []
        })
    }
})

router.post("/", function(req, res, next) {
    recipeList.push(req.body)
    res.json(req.body)
})

module.exports = router;