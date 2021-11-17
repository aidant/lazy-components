import { describe, it } from 'mocha'
import { expect } from 'chai'
import { getObservedAttributes } from './get-observed-attributes.js'

describe('get-observed-attributes', () => {
  it('generates a list of observable attributes', () => {
    expect(
      getObservedAttributes([
        {
          externalName: 'foo',
          internalName: 'bar',
          initialValue: null,
          constant: false,
        },
        {
          externalName: 'hello',
          internalName: 'world',
          initialValue: null,
          constant: false,
        },
        {
          externalName: 'test',
          internalName: 'test',
          initialValue: null,
          constant: true,
        },
      ])
    ).to.equal([
      {
        type: 'Literal',
        value: 'foo',
      },
      {
        type: 'Literal',
        value: 'hello',
      },
    ])
  })
})
