const mongoose = require('mongoose');
const schema = mongoose.Schema;

let recipeSchema = new schema({
    name: String,
    instructions: [String],
    ingredients: [String]
})

module.exports = mongoose.model("Recipe", recipeSchema)