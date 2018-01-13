import React from 'react'
import MetroCard from './MetroCard'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar'
import './Home.css'

const Home = () => {
  return (
    <div className="Home-container">
      <SearchBar />
      <div className="content">
        <h1>
          Open Contracts
          <span className="pull-right">
            <Link key={'new-contract'} to={`contracts/new`}>
              <button className="submit">New Contract</button>
            </Link>
          </span>
        </h1>
        <MetroCard />
      </div>
    </div>
  )
}

export default Home
