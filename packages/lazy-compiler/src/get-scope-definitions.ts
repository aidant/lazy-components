import { VariableDeclaration } from '@lazy/ast'
import { Prop } from './get-props.js'

export const getScopeDefinitions = (props: Prop[]): VariableDeclaration[] => {
  const VariableDeclarations: VariableDeclaration[] = []

  for (const prop of props) {
    VariableDeclarations.push({
      type: 'VariableDeclaration',
      kind: prop.constant ? 'const' : 'let',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: prop.internalName,
          },
          init: prop.initialValue,
        },
      ],
    })
  }

  return VariableDeclarations
}
