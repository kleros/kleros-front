import React, { Component } from 'react'
import Input from '../Input'
import './SearchBar.css'
import icon from '../../assets/icons/search_icon.svg'

class SearchBar extends Component {
  state = {
  }

  render () {
    return (
      <div className={`SearchBar-container ${this.props.theme}`}>
        <div className='icon'>
          <img src={icon} alt='icon' />
        </div>
        <div>
          <Input placeholder='search here' innerClassName='search' />
        </div>
      </div>
    )
  }
}

export default SearchBar
