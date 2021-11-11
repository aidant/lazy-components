import test from 'ava'
import { Program, Type } from '@lazy/ast'
import { parser } from './parser.js'

test('parser', t => {
  t.like(parser(`
    export let title = 'Hello World!'

    <div role="heading" aria-level="1">
      {{ title }}
    </div>
  `), {
    type: 'Program' as Type.Program,
    sourceType: 'module',
    body: [
      {
        type: 'ExportNamedDeclaration' as Type.ExportNamedDeclaration,
        declaration: {
          type: 'VariableDeclaration' as Type.VariableDeclaration,
          declarations: [
            {
              type: 'VariableDeclarator' as Type.VariableDeclarator,
              id: {
                type: 'Identifier' as Type.Identifier,
                typeAnnotation: null,
                name: 'title'
              },
              init: {
                type: 'Literal' as Type.Literal,
                value: 'Hello World!'
              }
            } 
          ],
          kind: 'let',
        },
        specifiers: [
          {
            type: 'ExportSpecifier' as Type.ExportSpecifier,
            local: {
              type: 'Identifier' as Type.Identifier,
              typeAnnotation: null,
              name: 'title'
            },
            exported: {
              type: 'Identifier' as Type.Identifier,
              typeAnnotation: null,
              name: 'title'
            }
          }
        ],
        source: null
      }
    ]
  })
})