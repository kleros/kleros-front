import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getDisputes } from '../../business/disputes/action-creators'
import { Kleros } from 'kleros-api'
import 'babel-polyfill'
import './GridContent.css'

class GridContent extends Component {

  componentDidMount () {
    this.props.getDataDisputes()
  }

  render () {
    const { hasErrored, isFetching, disputes } = this.props

    if (hasErrored) {
      return <p>Sorry! There was an error loading the balance</p>
    }

    if (isFetching){
      return (
          <div className='GridContent-container'>
            <div className='items'>
              <div className='linear-background-100'>
              </div>
              <div className='linear-background-90'>
              </div>
              <div className='linear-background-90'>
              </div>
            </div>
          </div>
      )
    }


    return (
      <div className='GridContent-container'>
        <div className='items'>
        { disputes.map(dispute =>
          <div key={ dispute.caseId } className='items-row'>
            <div className='item-project'>
              <div className='item'>{ dispute.title }</div>
              <div className='item'>{ dispute.category }</div>
            </div>
            <div className='item'>{ dispute.deadline }</div>
            <div className='item'>{ dispute.caseId }</div>
            <div className='item'>{ dispute.status }</div>
            <div className='item'>{ dispute.evidence }</div>
          </div>
        ) }
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
