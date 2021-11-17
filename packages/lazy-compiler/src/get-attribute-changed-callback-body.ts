import { ExpressionStatement } from '@lazy/ast'
import { Prop } from './get-props.js'

export const getAttributeChangedCallbackBody = (props: Prop[]): ExpressionStatement[] => {
  return [{
    type: 'ExpressionStatement',
    expression: {
      type: 'AssignmentExpression',
      operator: '=',
      left: {
        type: 'MemberExpression',
        object: {
          type: 'ThisExpression'
        },
        computed: true,
        optional: false,
        property: {
          type: 'Identifier',
          name: 'name'
        }
      },
      right: {
        type: 'Identifier',
        name: 'newValue'
      }
    }
  }]
}