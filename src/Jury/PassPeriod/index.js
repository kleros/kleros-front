import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { passPeriod } from '../../business/contract/action-creators'
import './PassPeriod.css'

const PassPeriod = (props) => {
  return (
    <div className="PassPeriod-container">
      <div className="PassPeriod-btn" onClick={props.passPeriod}>
        Next Period
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    passPeriod: () => dispatch(passPeriod())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PassPeriod))
