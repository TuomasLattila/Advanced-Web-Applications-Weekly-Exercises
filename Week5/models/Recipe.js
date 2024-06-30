const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

let recipeSchema = new schema({
    name: String,
    instructions: [String],
    ingredients: [String],
    categories: [ObjectId]
})

module.exports = mongoose.model("Recipe", recipeSchema)