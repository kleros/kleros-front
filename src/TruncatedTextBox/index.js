import React, { Component } from 'react'
import './TruncatedTextBox.css'

class TruncatedTextBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: props.text,
      truncatedCharacters: props.truncatedCharacters,
      truncated: true
    }
  }

  showMore() {
    this.setState({truncated: false})
  }

  showLess() {
    this.setState({truncated: true})
  }

  render() {
    const words = this.state.text.split(" ")
    // if there is no need to truncate return as is
    if (words.length <= this.state.truncatedCharacters) {
      return (
        <div className="truncatedTextBox">
          this.state.text
        </div>
      )
    }

    let displayText = ''
    let actionDiv

    if (this.state.truncated) {
      for (let i=0; i<this.state.truncatedCharacters; i++) {
        displayText += words[i] + " "
      }
      displayText += "..."
      actionDiv = (
        <div className="actionDiv" onClick={this.showMore.bind(this)}>Show More</div>
      )
    } else {
      displayText = this.state.text
      actionDiv = (
        <div className="actionDiv" onClick={this.showLess.bind(this)}>Show Less</div>
      )
    }
    return (
      <div className="truncatedTextBox">
        <div className="text">
          { displayText }
        </div>
        { actionDiv }
      </div>
    )
  }
}

export default TruncatedTextBox;
