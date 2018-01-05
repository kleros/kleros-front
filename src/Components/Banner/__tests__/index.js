import React from 'react'
import Banner from '../index'

describe('Banner - Exists', () => {
  test('render component successfully', () => {
    const component = shallow(<Banner linkTo="" />)
    expect(component).toMatchSnapshot()
  })
})

describe('Bannner - Render component with props', () => {
  const props = {
    linkTo: '/',
    title: 'banner',
    className: 'banner__class'
  }
  const component = shallow(<Banner {...props} />)

  test('render with Link component', () => {
    expect(component.find('Link').length).toBe(1)
  })

  test('render component that contains `Go back to the list` text', () => {
    expect(component.find('Link').props().children).toEqual(
      '← Go back to the list'
    )
  })

  test('render component with props[linkTo, title, className]', () => {
    expect(component.instance().props.linkTo).toEqual('/')
    expect(component.instance().props.title).toEqual('banner')
    expect(component.instance().props.className).toEqual('banner__class')
  })
})
