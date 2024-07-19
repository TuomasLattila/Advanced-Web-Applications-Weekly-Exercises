const mongoose = require("mongoose")
const schema = mongoose.Schema

const bookSchema = new schema({
  author: String,
  name: String,
  pages: Number
})

module.exports = mongoose.model("Book", bookSchema)