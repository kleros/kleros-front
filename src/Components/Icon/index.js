import React, { Component } from 'react'
import _ from 'lodash'
import './Icon.css'

class Icon extends Component {
  state = {
    isLoading: true,
    iconPicturePath: '/'
  }

  componentDidMount = async () => {
    let iconPicturePath = await import(`../../assets/icons/${this.props.name}.svg`)

    if (!_.isUndefined(iconPicturePath)) {
      this.setState({
        iconPicturePath,
        isLoading: false
      })
    }
  }

  render () {
    if (this.state.isLoading) {
      return (<div>Icon not found...</div>)
    }

    return (
      <div className={`Icon-container ${this.props.theme}`}>
        <img src={this.state.iconPicturePath} alt={this.props.name} />
      </div>
    )
  }
}

export default Icon
