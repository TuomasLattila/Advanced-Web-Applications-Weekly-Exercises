import React, { useState } from 'react'
import MyList from './MyList'

function MyContainer() {
  const [items, setItems] = useState([
    {id: 0, text: "kissa", clicked: false},
    {id: 1, text: "koira", clicked: false},
    {id: 2, text: "kilpikonna", clicked: false}
  ]) 
  const [text, setText] = useState('')
  
  const addItem = () => {
    setItems(prevItems => [...prevItems, {id: items.length, text: text, clicked: false}])
    setText('')
  }

  const updateItemStyle = (id) => {
    const newItems = items.map(item => 
      item.id === id && item.clicked === false ? {...item, clicked: true} : item.id === id && item.clicked === true ? {...item, clicked: false} : item
    )
    setItems(newItems)
  }

  return (
    <div>
        <textarea placeholder='Add item to the list' onChange={(e) => setText(e.target.value)} value={text}></textarea>
        <input type='submit' value='Submit' onClick={addItem}></input>
        <MyList header="my list is here" items={items} updateItemStyle={updateItemStyle}/>
    </div>
  )
}

export default MyContainer