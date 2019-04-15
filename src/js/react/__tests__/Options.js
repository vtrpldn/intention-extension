import React from 'react'
import { shallow } from 'enzyme'
import Options from '../Options'
import '../../utils/enzyme'

describe('Options component testing with Enzyme', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Options />)
    expect(wrapper).toMatchSnapshot()
  })
})
