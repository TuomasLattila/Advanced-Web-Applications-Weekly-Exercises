var express = require('express');
var router = express.Router();
const Recipe = require('../models/Recipe')

router.get("/:food", async function(req, res, next) {
    try {
        const recipe = await Recipe.findOne({name: req.params.food})
        if (recipe) {
            res.json({
                name: req.params.food,
                instructions: recipe.instructions,
                ingredients: recipe.ingredients
            })
        } else {
            res.json({
                name: req.params.food,
                instructions: [],
                ingredients: []
            })
        }
    } catch {
        return next();
    }
})

router.post("/", async function(req, res, next) {
    try {
        const recipe = await Recipe.findOne({name: req.body.name})
        if (!recipe) {
            const newRecipe = new Recipe({
                name: req.body.name,
                instructions: req.body.instructions,
                ingredients: req.body.ingredients,
                categories: req.body.categories
            })
            await newRecipe.save()
            res.send(req.body);
        } else {
            res.status(403).send("This recipe already exists.")
        }
    } catch {
        return next();
    }
})

module.exports = router;