import React, { Component } from 'react'
import './ExpandableTable.css'

class ExpandableTable extends Component {
  state = {
    expand: false
  }

  toggleMore = () => {
    this.setState({
      expand: !this.state.expand
    })
  }

  render () {
    const rowLimit = this.state.expand ? this.props.rows.length : this.props.rowLimit
    const rows = this.props.rows.slice(0, rowLimit)
    let actionDiv

    if (this.props.rows.length > this.props.rowLimit) {
      if (this.state.expand) {
        actionDiv = (
          <div className='actionDiv' onClick={this.toggleMore}>{this.props.lessMessage} &and;</div>
        )
      } else {
        actionDiv = (
          <div className='actionDiv' onClick={this.toggleMore}>{this.props.moreMessage} &or;</div>
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
