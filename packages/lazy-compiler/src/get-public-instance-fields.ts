import { PropertyDefinition } from '@lazy/ast'
import { Prop } from './get-props.js'

export const getPublicInstanceFields = (props: Prop[]): PropertyDefinition[] => {
  const definitions: PropertyDefinition[] = []

  for (const prop of props) {
    definitions.push({
      type: 'PropertyDefinition',
      computed: false,
      key: {
        type: 'Identifier',
        name: prop.externalName,
      },
      static: false,
      value: null
    })
  }

  return definitions
}