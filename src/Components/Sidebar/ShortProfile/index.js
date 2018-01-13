import React, { Component } from 'react'
import Identicon from '../../Identicon'
import {
  TRUNCATED_DIGITS,
  APP_VIEWS,
  KLEROS_VIEW_KEY
} from '../../../constants'
import { truncateText } from '../../../helpers/truncateText'
import FontAwesome from 'react-fontawesome'
import './ShortProfile.css'

class ShortProfile extends Component {
  swapView = () => {
    const appView = window.localStorage.getItem(KLEROS_VIEW_KEY)
    if (appView === APP_VIEWS.JUROR) {
      window.localStorage.setItem(KLEROS_VIEW_KEY, APP_VIEWS.PARTY)
    } else if (appView === APP_VIEWS.PARTY) {
      window.localStorage.setItem(KLEROS_VIEW_KEY, APP_VIEWS.JUROR)
    }

    window.location.reload()
  }

  render() {
    const {
      className,
      children,
      theme,
      address = '0x0',
      balancePNK = 0
    } = this.props

    return (
      <div className={`ShortProfile-container ${className} ${theme}`}>
        <div className="icon">
          <Identicon seed={address} />
        </div>
        <div className="description">
          <div className="address">
            {truncateText(address, TRUNCATED_DIGITS)}
          </div>
          <div className="balancePNK">{balancePNK} PNK</div>
        </div>
        <div className="swap-views" onClick={this.swapView}>
          <FontAwesome name="refresh" style={{ marginRight: '10px' }} />
        </div>
        {children}
      </div>
    )
  }
}

export default ShortProfile
