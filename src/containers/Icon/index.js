import React, { Component } from 'react'
import _ from 'lodash'
import './Icon.css'

class Icon extends Component {

  state = {
    isLoading: true
  }

  componentWillMount = async () => {
    let iconPicturePath = await import(`../../assets/icons/${this.props.name}.svg`)

    if (!_.isUndefined(iconPicturePath)) {
      this.setState({iconPicturePath: iconPicturePath})
      this.setState({isLoading: false})
    }
  }

  render () {
    if (this.state.isLoading) {
      return (<div>Loading icon...</div>)
    }

    return (
      <div className={`Icon-container ${this.props.theme}`}>
        <img src={this.state.iconPicturePath} alt={this.props.name} />
      </div>
    )
  }
}

export default Icon
