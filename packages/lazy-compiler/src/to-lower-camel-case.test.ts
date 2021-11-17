import { describe, it } from 'mocha'
import { expect } from 'chai'
import { toLowerCamelCase } from './to-lower-camel-case.js'

describe('to-lower-camel-case', () => {
  it('converts snake case to lower camel case', () => {
    expect(toLowerCamelCase('foo-bar')).to.equal('fooBar')
  })
})
