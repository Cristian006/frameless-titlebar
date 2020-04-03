import React from 'react'
import TestRenderer from 'react-test-renderer'
import Titlebar from './'

describe('Titlebar', () => {
  it('basic render', () => {
    const testRenderer = TestRenderer.create(<Titlebar title='test app' />)
    const testInstance = testRenderer.root
    expect(testInstance.findByProps({ title: 'test app' })).not.toBeNull();
  })
})
