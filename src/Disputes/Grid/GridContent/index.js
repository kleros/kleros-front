import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import 'babel-polyfill'
import { getDisputes } from '../../../business/disputes/action-creators'
import './GridContent.css'

class GridContent extends Component {
  componentWillMount = () => {
    this.props.getDataDisputes()
  }

  render () {
    const { hasErrored, isFetching, disputes } = this.props

    if (hasErrored) {
      return <p>Sorry! There was an error loading the balance</p>
    }

    if (isFetching) {
      return (
        <div className='GridContent-container'>
          <div className='items loader'>
            <div className='linear-background-100' />
            <div className='linear-background-90' />
            <div className='linear-background-90' />
          </div>
        </div>
      )
    }

    return (
      <div className='GridContent-container'>
        <div className='items'>
          {
            disputes.map(dispute =>
              <Link to={ `disputes/${dispute.caseId}` }>
                <div key={ dispute.caseId } className='items-row'>
                  <div className='item item-project'>
                    <div className='item-title'>{ dispute.title }</div>
                    <div className='item-category'>{ dispute.category }</div>
                  </div>
                  <div className='item item-deadline'>{ dispute.deadline }</div>
                  <div className='item item-case_id'>#{ dispute.caseId }</div>
                  <div className='item item-status'>{ dispute.status }</div>
                </div>
              </Link>
            )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    disputes: state.disputes.disputes,
    hasErrored: state.disputes.failureDisputes,
    isFetching: state.disputes.requestDisputes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDataDisputes: () => dispatch(getDisputes())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GridContent))
