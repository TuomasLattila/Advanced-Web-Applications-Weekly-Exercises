import React, { useState, useEffect } from 'react'
// api: https://jsonplaceholder.typicode.com/posts

function About() {
  const [list, setList] = useState([])

  useEffect(() => {
    let mounted = true
    async function fetchData() {
      const results = await fetch("https://jsonplaceholder.typicode.com/posts")
      if (results.ok) {
        const array = await results.json()
        //console.log(array)
        if (mounted) {
          setList(array)
        }  
      }
    } 
    fetchData()
    return () => {
      mounted = false 
    }
  }, [])

  return (
    <div>
      title 1
      <ul>
        title 2
        {list.map((item, index) => (
          <li key={item.id} >{item.title}</li>
        ))}
      </ul>
      </div>
  )
}

export default About