import { describe, it } from 'mocha'
import { expect } from 'chai'
import { compile } from './compiler.js'

describe('compiler', () => {
  it('parses a simple component', () => {
    expect(
      compile('heading-1', {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            declaration: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    // typeAnnotation: null,
                    name: 'title',
                  },
                  init: {
                    type: 'Literal',
                    value: 'Hello World!',
                  },
                },
              ],
              kind: 'let',
            },
            specifiers: [],
            source: null,
          },
          {
            type: 'Element',
            tag: 'div',
            attributes: [
              {
                type: 'Attribute',
                name: 'role',
                value: [
                  {
                    type: 'Literal',
                    value: 'heading',
                  },
                ],
              },
              {
                type: 'Attribute',
                name: 'aria-level',
                value: [
                  {
                    type: 'Literal',
                    value: 1,
                  },
                ],
              },
            ],
            children: [
              {
                type: 'DataBinding',
                expression: {
                  type: 'Identifier',
                  name: 'title',
                },
              },
            ],
          },
        ],
      })
    ).to.deep.equal({

    })
  })
})
