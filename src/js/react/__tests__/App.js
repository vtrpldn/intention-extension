import React from 'react'
import { shallow } from 'enzyme'
import App from '../App'
import '../../utils/enzyme'

describe('App component testing with Enzyme', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toMatchSnapshot()
  })
})
