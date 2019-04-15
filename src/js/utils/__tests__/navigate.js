import chrome from 'sinon-chrome'
import { navigate, navigationTarget } from '../navigate'

global.chrome = chrome

describe('navigate.js', () => {
  const url = 'http://my-domain.com'

  it('should navigate to new window', () => {
    expect(chrome.windows.create.notCalled).toBe(true)
    navigate(url, navigationTarget.NEW_WINDOW)
    expect(chrome.windows.create.calledOnce).toBe(true)
    expect(chrome.windows.create.withArgs({ url, focused: true, type: 'normal' }).calledOnce).toBe(true)
  })
})
