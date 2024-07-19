const express = require('express')
const Book = require('../models/Book')
const router = express.Router()

router.post("/", async (req, res) => {
  try {
    const foundBook = await Book.findOne({ name: req.body.name, author: req.body.author, pages: req.body.pages })
    if (!foundBook) {
      const newBook = new Book({
        name: req.body.name, 
        author: req.body.author, 
        pages: req.body.pages
      })
      await newBook.save()
      res.status(200).json(newBook)
    } else {
      res.status(403).send("This book already exists in the database!")
    }
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get("/:book", async (req, res) => {
  try {
    const foundBook = await Book.findOne({ name: req.params.book })
    if (foundBook) {
      res.json(foundBook)
    } else {
      res.sendStatus(403).send(`No book named ${req.params.book} was found!`)
    }
  } catch (error) {
    res.status(500).send(error)
  }
})


module.exports = router; 