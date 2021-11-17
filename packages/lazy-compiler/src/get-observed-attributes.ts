import { Literal } from '@lazy/ast'
import { Prop } from './get-props.js'

export const getObservedAttributes = (props: Prop[]): Literal[] => {
  const observedAttributes: Literal[] = []

  for (const prop of props) {
    if (!prop.constant) {
      observedAttributes.push({
        type: 'Literal',
        value: prop.externalName,
      })
    }
  }

  return observedAttributes
}
