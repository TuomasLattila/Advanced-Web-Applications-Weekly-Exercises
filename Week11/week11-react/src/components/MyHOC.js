import React from 'react'

function MyHOC(Component, props) {
  return (
      <div className='wrapper'>
        <Component name={props.name} />
      </div>
    ) 
}

export default MyHOC