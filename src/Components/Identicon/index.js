import React, { Component } from 'react'
import Blockies from './blockies'
import './Identicon.css'

class Identicon extends Component {
  render () {
    const imgURL = Blockies.create({
      seed: this.props.seed || '0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359',
      scale: this.props.scale || 5,
      size: this.props.size || 10
    }).toDataURL()

    const style = {
      backgroundImage: `url(${imgURL})`,
      width: (this.props.width && `${this.props.width}px`) || '50px',
      height: (this.props.height && `${this.props.height}px`) || '50px',
      borderRadius: this.props.borderRadius || '3px',
      display: 'inline-block'
    }

    return (
      <div className='ethereum-address-icon' style={style} />
    )
  }
}

export default Identicon
