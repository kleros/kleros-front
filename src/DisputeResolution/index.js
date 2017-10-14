import React from 'react'
import SearchBar from '../SearchBar'
import Banner from './Banner'
import Parties from './Parties'
import Information from './Information'
import Evidence from './Evidence'
import Decision from './Decision'
import "./DisputeResolution.css"

// FIXME this is a hardcoded dispute for testing purposes
const dispute = {
  title: "Uncompleted Software Product",
  parties: ["Miguel Lorem Ipsum", "Giselle Bexter"],
  description: "Giselle is an entrepreneur based on France. She contracts Miguel, a programmer from Guatemala, at a p2p freelancing platform to build a new website for her company. After they agree on a price, terms and conditions, Miguel gets to work. A couple of weeks later, he delivers the product. But Giselle is not satisfied. She argues that the quality of Miguel’s work is considerably lower than expected. Miguel replies that he did exactly what was in the agreement.",
  arbitrationFee: 0.5,
  timeRemaining: "2d 12h 15m",
  evidence: [{
    name: "Contract",
    description: "short description about evidence",
    downloadLink: "",
  },{
    name: "Denial",
    description: "short description",
    downloadLink: "",
  },
  {
    name: "Various",
    description: "short description",
    downloadLink: "",
  },
  {
    name: "Website Drafts",
    description: "short description",
    downloadLink: "",
  },
  {
    name: "Website Designs",
    description: "short description",
    downloadLink: "",
  },
  {
    name: "Testimony",
    description: "short description",
    downloadLink: "",
  }],
  resolutionOptions: [
    {
      name: "Reimburse Giselle",
      description: "This option transfers funds to Giselle.",
      value: "reimburse"
    },
    {
      name: "Give Miguel one extra week to finish the website",
      description: "This option blocks new disputes for one week and removes this option from further dispute.",
      value: "extend"
    },
    {
      name: "Pay Miguel",
      description: "This option transfers funds to Miguel address.",
      value: "pay"
    },
  ]
}

const DisputeResolution = () => {
  return (
    <div className="dispute-resolution">
      <SearchBar />
      <Banner title={dispute.title} />
      <div className="divider"></div>
      <Parties parties={dispute.parties} />
      <div className="divider"></div>
      <Information text={dispute.description} truncatedCharacters={50} arbitrationFee={dispute.arbitrationFee} timeRemaining={dispute.timeRemaining} />
      <div className="divider"></div>
      <Evidence evidence={dispute.evidence} />
      <div className="divider"></div>
      <Decision resolutionOptions={dispute.resolutionOptions} />
    </div>
  )
}

export default DisputeResolution
