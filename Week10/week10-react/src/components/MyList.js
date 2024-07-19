import React from 'react'

function MyList({header, items, updateItemStyle}) {
  return (
    <div>
      <h2>{header}</h2>
      <ol>
        {items.map((item) => (
          <li style={item.clicked ? { textDecoration: "line-through" } : { textDecoration: "" }} key={item.id} onClick={() => updateItemStyle(item.id)}>{item.text}</li>
        ))}
      </ol>
    </div>
  )
}

export default MyList 