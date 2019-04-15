import React from 'react'
import { shallow } from 'enzyme'
import Popup from '../Popup'
import '../../utils/enzyme'

describe('Popup component testing with Enzyme', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Popup />)
    expect(wrapper).toMatchSnapshot()
  })
})
