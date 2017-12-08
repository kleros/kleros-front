import React from 'react'
import GridContent from './Grid/GridContent'
import Grid from './Grid'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar'
import './ContractsTable.css'

const ContractsTable = () => {
  return (
    <div className='ContractsTable-container'>
      <SearchBar />
      <div className='content'>
        <h1>
          Open Contracts
          <span className='pull-right'>
            <Link
              key={'new-contract'}
              to={`contracts/new`}>
              <button className='submit'>
                New Contract
              </button>
            </Link>
          </span>
        </h1>
        <Grid>
          <GridContent />
        </Grid>
      </div>
    </div>
  )
}

export default ContractsTable
