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
    } catch (error) {
        return next(error);
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
                categories: req.body.categories,
                images: req.body.images
            })
            await newRecipe.save()
            res.send(req.body);
        } else {
            res.status(403).json({ msg: "This recipe already exists."})
        }
    } catch (error) {
        return next(error);
    }
})

module.exports = router;