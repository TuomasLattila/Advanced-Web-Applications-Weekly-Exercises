import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function BookInfo() {
  const { book } = useParams()
  const [bookObject, setBookObject] = useState(null)

  useEffect(() => {
    if (bookObject === null) {
      fetch(`/api/book/${book}`)
      .then((res) => res.json())
      .then((json) => {
        setBookObject(json)
      })
    }
  }, [book, bookObject])

  if (bookObject === null) {
    return <p>Loading...</p>;
  } 

  return (
    <div>
      <h3>{bookObject.name}</h3>
      <h3>{bookObject.author}</h3>
      <h3>{bookObject.pages}</h3>
    </div> 
  )
} 
  
export default BookInfo