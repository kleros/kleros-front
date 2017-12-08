import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import 'babel-polyfill'
import { getDisputes } from '../../../redux/disputes/action-creators'
import { truncateText } from '../../../helpers/truncateText'
import { STATUS_TO_STATE } from '../../../constants'
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
              const deadline = `${dispute.deadline.getUTCDate()}/${dispute.deadline.getUTCMonth()}/${dispute.deadline.getFullYear()}`

              return (
                <Link key={dispute.arbitrableContractAddress} to={`${baseLink}/${dispute.arbitrableContractAddress}`}>
                  <div className='items-row'>
                    <div className='item item-project'>
                      <div className='item-title'>{ truncateText(dispute.description, 35) }</div>
                      <div className='item-category'>{ dispute.category }</div>
                    </div>
                    <div className='item item-deadline'>{ deadline }</div>
                    <div className='item item-case_id'>{ truncateText(dispute.hash, 10) }</div>
                    <div className='item item-status'>{ STATUS_TO_STATE[dispute.status] }</div>
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
