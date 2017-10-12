import React from 'react'
import SearchBar from '../SearchBar'
import Banner from './Banner'
import Parties from './Parties'
import Information from './Information'
import "./DisputeResolution.css"

// FIXME this is a hardcoded dispute for testing purposes
const dispute = {
  title: "Uncompleted Software Product",
  parties: ["Miguel Lorem Ipsum", "Giselle Bexter"],
  description: "Giselle is an entrepreneur based on France. She contracts Miguel, a programmer from Guatemala, at a p2p freelancing platform to build a new website for her company. After they agree on a price, terms and conditions, Miguel gets to work. A couple of weeks later, he delivers the product. But Giselle is not satisfied. She argues that the quality of Miguel’s work is considerably lower than expected. Miguel replies that he did exactly what was in the agreement.",
  arbitrationFee: 0.5,
  timeRemaining: "2d 12h 15m",
}

const DisputeResolution = () => {
  return (
    <div className="dispute-resolution">
      <SearchBar />
      <Banner title={dispute.title} />
      <Parties parties={dispute.parties} />
      <Information text={dispute.description} truncatedCharacters={50} arbitrationFee={dispute.arbitrationFee} timeRemaining={dispute.timeRemaining} />
    </div>
  )
}

export default DisputeResolution
