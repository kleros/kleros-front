import React from 'react'
import './Grid.css'

const Grid = ({
  className,
  itemTitles=[],
  items=[],
  children,
  ...rest
}) => (
  <div className={`Grid-container ${className}`}>
    <div className='grid'>
      <div className='header'>
        { itemTitles.map(itemTitle => <div key={ itemTitle }>{ itemTitle }</div>) }
      </div>
      <div className='grid-content'>
        <div className='items'>
          {items.map(item =>
            <div key={ item.caseId } className='items-row'>
              <div className='item-project'>
                <div className='item'>{ item.title }</div>
                <div className='item'>{ item.category }</div>
              </div>
              <div className='item'>{ item.deadline }</div>
              <div className='item'>{ item.caseId }</div>
              <div className='item'>{ item.status }</div>
              <div className='item'>{ item.evidence }</div>
            </div>
          )}
        </div>
      </div>
    </div>
    { children }
  </div>
)

export default Grid
