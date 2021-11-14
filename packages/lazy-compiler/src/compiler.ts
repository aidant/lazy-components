import { Program } from '@lazy/ast' 
import { toUpperCamelCase } from './to-upper-camel-case.js'

export const compile = (name: string, program: Program): Program => {
  return {
    type: 'Program',
    sourceType: 'module',
    body: [
      {
        type: 'ExportNamedDeclaration',
        declaration: {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: toUpperCamelCase(name)
          },
          superClass: {
            type: 'Identifier',
            name: 'HTMLElement'
          },
          body: {
            type: 'ClassBody',
            body: [
              // { 
              //   type: 'MethodDefinition',
              //   kind: 'constructor',
              //   computed: false,
              //   key: {
              //     type: 'Identifier',
              //     name: 'constructor'
              //   },
              //   static: false,
              //   value: {
              //     type: 'FunctionExpression',
              //     async: false,
              //   }
              // }
            ]
          }
        },
        specifiers: [],
        source: null
      },
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'customElements'
            },
            property: {
              type: 'Identifier',
              name: 'define'
            },
            computed: false,
            optional: false
          },
          arguments: [
            {
              type: 'Literal',
              value: name,
            },
            {
              type: 'Identifier',
              name: toUpperCamelCase(name)
            }
          ],
          optional: false
        }
      }
    ]
  }
}
