import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import ActivatePNK from './ActivatePNK'
import { getArbitratorData } from '../business/contract/action-creators'
import './Jury.css'

class Jury extends Component {
  componentDidMount() {
    this.props.getArbitratorData()
  }

  render () {
    console.log(this.props.arbitratorData)

    let period = -1
    if (!this.props.isFetching) period = this.props.arbitratorData.data.period

    let content
    switch (period) {
      case 0:
        content = (
          <ActivatePNK />
        )
        break;
      default:
        content = (
          <div></div>
        )
    }

    return (
      <div className='Jury-container'>
        <div className='content'>
          { content }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    arbitratorData: state.contract,
    hasErrored: state.contract.failureContract,
    isFetching: state.contract.requestContract
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getArbitratorData: disputeId => dispatch(getArbitratorData(disputeId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Jury))
