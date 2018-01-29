import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import 'babel-polyfill'
import { getDisputes } from '../../../redux/disputes/action-creators'
import { truncateText } from '../../../helpers/truncateText'
import { STATUS_TO_STATE } from '../../../constants'
import './GridContent.css'

export class GridContent extends Component {
  constructor () {
    super()
    this.state = {
      currentPage: 1
    }
    this.paginateHandler = this.paginateHandler.bind(this)
    this.paginateInputHandler = this.paginateInputHandler.bind(this)
  }
  componentWillMount () {
    this.props.getDataDisputes()
  }

  paginateHandler = (event) =>
    (this.setState({
      currentPage: Number(event.target.dataset.pageNumber)
    }))

  paginateInputHandler (event) {
    this.setState({
      currentPage: Number(event.target.value)
    })
  }

  render () {
    let CustomLink = this.props.Link || Link

    const {hasErrored, isFetching, disputes, baseLink, filterFunction, rowsPerPage = 9} = this.props
    const {currentPage = 1} = this.state
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
    const indexOfLastRow = currentPage * rowsPerPage
    const indexOfFirstRow = indexOfLastRow - rowsPerPage
    const list = filteredDisputes.filter(dispute => {
      return dispute.arbitratorAddress === process.env.REACT_APP_ARBITRATOR_ADDRESS
    })
    const currentRows = list.slice(indexOfFirstRow, indexOfLastRow)

    const totalPages = Math.ceil(list.length / rowsPerPage) || 1

    return (
      <div className='GridContent-container'>
        <div className='items'>
          {
            _.isEmpty(disputes) &&
            <div className='items-row'>
              <div className='item item-no-disputes'>
                You have no disputes.
              </div>
            </div>
          }
          {
            currentRows.map(dispute =>
              (
                <CustomLink key={dispute.arbitrableContractAddress}
                  to={`${baseLink}/${process.env.REACT_APP_ARBITRATOR_ADDRESS}/${dispute.disputeId}`}>
                  <div className='items-row'>
                    <div className='item item-project'>
                      <div className='item-title'>{ truncateText(dispute.description ? dispute.description : 'unavailable', 35) }</div>
                      <div className='item-category'>{ dispute.category }</div>
                    </div>
                    <div className='item item-deadline'>{ dispute.deadline }</div>
                    <div className='item item-case_id'>{ truncateText(dispute.hash, 10) }</div>
                    <div className='item item-status'>{ STATUS_TO_STATE[dispute.arbitrableContractStatus] }</div>
                  </div>
                </CustomLink>
              )
            )
          }
        </div>

        { totalPages > 1 && <div className='pagination-footer'>
          <ul className='pagination-container'>
            <li className='first'
              key='first'
              data-page-number={1}
              onClick={this.paginateHandler}>
              {'First'}
            </li>
            <li
              key='previous'
              data-page-number={this.state.currentPage - 1}
              className={this.state.currentPage <= 1 ? 'disabled' : ''}
              onClick={this.state.currentPage > 1 && this.paginateHandler}>
              {'Previous'}
            </li>
            <li className='pagerInput'>
              <span>Showing page </span>
              <input type='number' min={1} max={totalPages} step={1}
                onChange={this.paginateInputHandler} value={this.state.currentPage} key='input' />
              <span> of </span>
              <span className='page-count'>{totalPages}</span>
            </li>
            <li
              key='next'
              data-page-number={this.state.currentPage + 1}
              className={this.state.currentPage >= totalPages ? 'disabled' : ''}
              onClick={this.state.currentPage < totalPages && this.paginateHandler}
            >
              {'Next'}
            </li>
            <li className='last'
              key='last'
              data-page-number={totalPages}
              onClick={this.paginateHandler}>
              {'Last'}
            </li>
          </ul>
        </div>}

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
