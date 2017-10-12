import React from 'react'
import SearchBar from '../SearchBar'
import Banner from './Banner'
import "./DisputeResolution.css"

// FIXME this is a hardcoded dispute for testing purposes
const dispute = {
  title: "Uncompleted Software Product",
}

const DisputeResolution = () => {
  return (
    <div className="dispute-resolution">
      <SearchBar />
      <Banner title={dispute.title} />
    </div>
  )
}

export default DisputeResolution
