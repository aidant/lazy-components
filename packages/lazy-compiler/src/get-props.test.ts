import { describe, it } from 'mocha'
import { expect } from 'chai'
import { getProps } from './get-props.js'

describe('get-props', () => {
  it('converts exports to props', () => {
    expect(
      getProps([
        {
          type: 'ExportNamedDeclaration',
          specifiers: [],
          source: null,
          declaration: {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'hello',
                },
                init: null,
              },
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'greetings',
                },
                init: null,
              },
            ],
            kind: 'let',
          },
        },
        {
          type: 'ExportNamedDeclaration',
          specifiers: [],
          source: null,
          declaration: {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'world',
                },
                init: {
                  type: 'Literal',
                  value: '',
                },
              },
            ],
            kind: 'const',
          },
        },
        {
          type: 'ExportNamedDeclaration',
          specifiers: [],
          source: null,
          declaration: {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'test',
            },
            generator: false,
            async: false,
            params: [],
            body: {
              type: 'BlockStatement',
              body: [],
            },
          },
        },
        {
          type: 'ExportNamedDeclaration',
          specifiers: [
            {
              type: 'ExportSpecifier',
              local: {
                type: 'Identifier',
                name: 'hello',
              },
              exported: {
                type: 'Identifier',
                name: 'x',
              },
            },
          ],
          source: null,
          declaration: null,
        },
      ])
    ).to.equal([
      {
        externalName: 'hello',
        internalName: 'hello',
        initialValue: null,
        constant: false,
      },
      {
        externalName: 'greetings',
        internalName: 'greetings',
        initialValue: null,
        constant: false,
      },
      {
        externalName: 'world',
        internalName: 'world',
        initialValue: {
          type: 'Literal',
          value: '',
        },
        constant: true,
      },
      {
        externalName: 'test',
        internalName: 'test',
        initialValue: {
          type: 'FunctionExpression',
          id: {
            type: 'Identifier',
            name: 'test',
          },
          generator: false,
          async: false,
          params: [],
          body: {
            type: 'BlockStatement',
            body: [],
          },
        },
        constant: true,
      },
      // is this expected, should this be allowed?
      {
        externalName: 'x',
        internalName: 'hello',
        initialValue: {
          type: 'Identifier',
          name: 'hello',
        },
        constant: true,
      },
    ])
  })
})
