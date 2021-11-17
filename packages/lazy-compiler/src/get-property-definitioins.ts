import { AssignmentOperator, ExpressionStatement, MethodDefinition, Property } from '@lazy/ast'
import { Prop } from './get-props.js'
import { toLowerCamelCase } from './to-lower-camel-case.js'

export const getPropertyDefinitions = (props: Prop[]): ExpressionStatement => {
  const properties: Property[] = []

  for (const prop of props) {
    const propertyDefinitions: Property[] = [
      {
        type: 'Property',
        method: false,
        computed: false,
        shorthand: false,
        kind: 'init',
        key: {
          type: 'Identifier',
          name: 'get',
        },
        value: {
          type: 'ArrowFunctionExpression',
          id: null,
          expression: false,
          generator: false,
          async: false,
          params: [],
          body: {
            type: 'Identifier',
            name: prop.internalName,
          },
        },
      },
    ]

    if (!prop.constant) {
      propertyDefinitions.push({
        type: 'Property',
        method: false,
        computed: false,
        shorthand: false,
        kind: 'init',
        key: {
          type: 'Identifier',
          name: 'set',
        },
        value: {
          type: 'ArrowFunctionExpression',
          id: null,
          expression: false,
          generator: false,
          async: false,
          params: [
            {
              type: 'Identifier',
              name: 'value',
            },
          ],
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'AssignmentExpression',
                  operator: AssignmentOperator['='],
                  left: {
                    type: 'Identifier',
                    name: prop.internalName,
                  },
                  right: {
                    type: 'Identifier',
                    name: 'value',
                  },
                },
              },
            ],
          },
        },
      })
    }

    properties.push({
      type: 'Property',
      method: false,
      computed: false,
      kind: 'init',
      shorthand: false,
      key: {
        type: 'Identifier',
        name: toLowerCamelCase(prop.externalName),
      },
      value: {
        type: 'ObjectExpression',
        properties: propertyDefinitions,
      },
    })
  }

  return {
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: 'Object',
        },
        property: {
          type: 'Identifier',
          name: 'defineProperties',
        },
        computed: false,
        optional: false,
      },
      arguments: [
        {
          type: 'ThisExpression',
        },
        {
          type: 'ObjectExpression',
          properties,
        },
      ],
      optional: false,
    },
  }
}
