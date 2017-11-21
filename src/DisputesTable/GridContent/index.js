import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import 'babel-polyfill'
import { getDisputes } from '../../business/disputes/action-creators'
import { truncateAddress } from '../../helpers/truncateAddress'
import { STATUS_TO_STATE } from '../../constants'
import './GridContent.css'

class GridContent extends Component {
  componentWillMount () {
    this.props.getDataDisputes()
  }

  render () {
    const { hasErrored, isFetching, disputes, baseLink, filterFunction } = this.props
    if (hasErrored) {
      return <p>Sorry! There was an error loading the disputes</p>
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

    const filteredDisputes = filterFunction(disputes)

    return (
      <div className='GridContent-container'>
        <div className='items'>
          {
            (disputes.length === 0) &&
            <div className='items-row'>
              <div className='item item-no-disputes'>
                You have no disputes.
              </div>
            </div>
          }
          {
            filteredDisputes.map(dispute => {
              return (
                <Link key={dispute.disputeData.hash} to={`${baseLink}/${dispute.disputeData.hash}`}>
                  <div className='items-row'>
                    <div className='item item-project'>
                      <div className='item-title'>{ dispute.disputeData.title }</div>
                      <div className='item-category'>{ dispute.contractData.category }</div>
                    </div>
                    <div className='item item-deadline'>{ dispute.disputeData.deadline }</div>
                    <div className='item item-case_id'>{ truncateAddress(dispute.disputeData.hash, 10) }</div>
                    <div className='item item-status'>{ STATUS_TO_STATE[dispute.contractData.status] }</div>
                  </div>
                </Link>
              )
            }

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
