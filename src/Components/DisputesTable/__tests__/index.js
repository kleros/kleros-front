import React from 'react'
import {GridContent} from '../GridContent'

describe('Disputes Table', () => {
  let disputes = []
  for (let cnt = 1; cnt <= 1000; cnt += 1) {
    disputes.push({
      arbitratorAddress: process.env.REACT_APP_ARBITRATOR_ADDRESS,
      arbitrableContractAddress: cnt,
      description: 'Case ' + cnt,
      hash: cnt + '',
      arbitrableContractStatus: cnt % 5,
      category: 'Freelance',
      deadline: 'Tomorrow',
      partyA: 'abcdefghijklm',
      partyB: 'nopqrstuvwxyz'
    })
  }

  let props = {
    hasErrored: false,
    isFetching: false,
    disputes: disputes,
    getDataDisputes: () => {

    },
    hasPagination: true,
    baseLink: 'disputes',
    filter: () => true,
    filterFunction: (disputes) => disputes,
    Link: (props) => (<a href='#/{props.to}'>{props.children}</a>)
  }
  const component = render(
    <GridContent {...props} />
  )
  test('should have the correct amount of pages', () => {
    expect(component.find('.page-count').text()).toEqual('112')
  })
})
