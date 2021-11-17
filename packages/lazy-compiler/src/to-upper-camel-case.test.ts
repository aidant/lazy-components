import { describe, it } from 'mocha'
import { expect } from 'chai'
import { toUpperCamelCase } from './to-upper-camel-case.js'

describe('to-upper-camel-case', () => {
  it('converts snake case to upper camel case', () => {
    expect(toUpperCamelCase('foo-bar')).to.equal('FooBar')
  })
})
