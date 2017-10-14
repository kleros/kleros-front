import React, { Component } from 'react'
import './ExpandableTable.css'

class ExpandableTable extends Component {
  state = {
    expand: false
  }

  showMore() {
    this.setState({
      expand: true
    })
  }

  showLess() {
    this.setState({
      expand: false
    })
  }

  render() {
    const rows = []
    const rowLimit =  this.state.expand ? this.props.rows.length : this.props.rowLimit
    let actionDiv

    for (let i=0; i<rowLimit; i++) {
      rows.push(
        this.props.rows[i]
      )
    }

    if (this.props.rows.length > this.props.rowLimit) {
      if (this.state.expand) {
        actionDiv = (
          <div className="actionDiv" onClick={this.showLess.bind(this)}>{this.props.lessMessage} &and;</div>
        )
      } else {
        actionDiv = (
          <div className="actionDiv" onClick={this.showMore.bind(this)}>{this.props.moreMessage} &or;</div>
        )
      }
    }

    return (
      <div className={`ExpandableTable ${this.props.theme}`}>
        { rows }
        { actionDiv }
      </div>
    )
  }
}

export default ExpandableTable
