import React from 'react'
import { Form } from '../Form'

describe('Form Exists', () => {
  const component = shallow(<Form />)

  test('should render component properly', () => {
    expect(component).toMatchSnapshot()
  })

  test('should render Field component properly', () => {
    expect(component.find('Field').length).toBe(1)
  })

  test('should render button text', () => {
    expect(component.find('button').text()).toBe('Activate')
  })
})
