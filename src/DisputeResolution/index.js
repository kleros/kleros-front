import React from 'react'
import SearchBar from '../SearchBar'
import Banner from './Banner'
import Parties from './Parties'
import "./DisputeResolution.css"

// FIXME this is a hardcoded dispute for testing purposes
const dispute = {
  title: "Uncompleted Software Product",
  parties: ["Miguel Lorem Ipsum", "Giselle Bexter"],
}

const DisputeResolution = () => {
  return (
    <div className="dispute-resolution">
      <SearchBar />
      <Banner title={dispute.title} />
      <Parties parties={dispute.parties} />
    </div>
  )
}

export default DisputeResolution
