import React, { useEffect, useState } from 'react'

function AddBook() {
  const [newBook, setNewBook] = useState(false)
  const [name, setName] = useState("")
  const [author, setAuthor] = useState("")
  const [pages, setPages] = useState("")

  const handleNameChange = (event) => {
    setName(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handlePagesChange = (event) => {
    setPages(event.target.value)
  }

  useEffect(() => {
    if (newBook) {
      fetch('/api/book', {
        method: "POST",
        body: JSON.stringify({
          name: newBook.name,
          author: newBook.author,
          pages: newBook.pages
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((res) => {
          if (res.ok) {
            setName("")
            setAuthor("")
            setPages("")
          }
          setNewBook(false)
        })
    }
  }, [newBook])

  const createNewBookObject = (event) => {
    event.preventDefault()
    if (name !== "" && author !== "" && pages !== "") {
      setNewBook({
        name: name,
        author: author,
        pages: pages
      })
    }
  }  


  return (
    <div>
      <label>Save new book:</label>
        <form onSubmit={createNewBookObject} id='add_book_info'>
          <input onChange={handleNameChange} value={name} id='name' type='string' placeholder='Add name'></input><br/>
          <input onChange={handleAuthorChange} value={author} id='author' type='string' placeholder='Add author'></input><br/>
          <input onChange={handlePagesChange} value={pages} id='pages' type='number' placeholder='Add number of pages'></input><br/>
          <input id='submit' type='submit' value="Submit book"></input>
        </form>
    </div>
  )
}

export default AddBook