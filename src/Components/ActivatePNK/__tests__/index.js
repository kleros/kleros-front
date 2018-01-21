import React from 'react'
import ActivatePNK from '../index'

describe('Activate Exist', () => {
  const component = shallow(<ActivatePNK />)
  test('should render Activate component correctly', () => {
    expect(component).toMatchSnapshot()
  })
})
