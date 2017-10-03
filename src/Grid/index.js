import React from 'react'
import './Grid.css'

const Grid = ({
  className,
  itemTitles=[],
  children,
  ...rest
}) => (
  <div className={`Grid-container ${className}`}>
    <div className='grid'>
      <div className='header'>
        { itemTitles.map(itemTitle => <div key={ itemTitle }>{ itemTitle }</div>) }
      </div>
      { children }
    </div>

  </div>
)

export default Grid
