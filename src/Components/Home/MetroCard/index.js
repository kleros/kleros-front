import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import 'babel-polyfill'
import FontAwesome from 'react-fontawesome'
import { getContracts } from '../../../redux/contracts/action-creators'
import { truncateText } from '../../../helpers/truncateText'
import Identicon from '../../Identicon'
import './MetroCard.css'

class MetroCard extends Component {
  componentWillMount () {
    this.props.getDataContracts()
  }

  render () {
    const { hasErrored, isFetching, contracts = [] } = this.props
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

    let contractsLast3Elements = []

    if (!_.isEmpty(contracts)) {
      contractsLast3Elements = _.takeRight(contracts, 3)
    }

    return (
      <div className='MetroCard-container'>
        {
          _.isEmpty(contracts) &&
          <div className='no-contracts'>
            You have no contracts.
          </div>
        }
        {
          contractsLast3Elements.map(contract =>
            <div className='card'>
              <Link key={contract.address} to={`contract-summary/${contract.address}`}>
                <div className='card-content'>
                  <div className='card-icon'>
                    <Identicon seed={contract.address} />
                  </div>
                  <div className='card-details'>
                    <div className='card-details-item'>
                      <b>{truncateText(contract.address, 20)}</b>
                    </div>
                    <div className='card-details-item'>
                      Party A: {truncateText(contract.partyA, 20)}
                    </div>
                    <div className='card-details-item'>
                      Party B: {truncateText(contract.partyB, 20)}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    contracts: state.contracts.contracts,
    hasErrored: state.contracts.failureDisputes,
    isFetching: state.contracts.requestDisputes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDataContracts: () => dispatch(getContracts())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MetroCard))
