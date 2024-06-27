var express = require('express');
var router = express.Router();
var recipeList = require('../recipeList')
const mongoose = require('mongoose')
const Recipe = require('../models/Recipe')

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

router.post("/", async function(req, res, next) {
    try {
        const recipe = await Recipe.findOne({name: req.body.name})
        if (!recipe) {
            const newRecipe = new Recipe({
                name: req.body.name,
                instuctions: req.body.instructions,
                ingredients: req.body.ingredients
            })
            await newRecipe.save()
            res.send(req.body);
        } else {
            res.status(403).send("This recipe already exists.")
        }
    } catch {
        return next(err);
    }
})

module.exports = router;