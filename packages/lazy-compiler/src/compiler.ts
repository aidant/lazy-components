import { Element, ExportNamedDeclaration, ImportDeclaration, Program, Statement } from '@lazy/ast'
import { getPropertyDefinitions } from './get-property-definitioins.js'
import { getComponentBoilerplate } from './get-component-boilerplate.js'
import { getObservedAttributes } from './get-observed-attributes.js'
import { getProps } from './get-props.js'
import { getScopeDefinitions } from './get-scope-definitions.js'
import { getPublicInstanceFields } from './get-public-instance-fields.js'
import { getAttributeChangedCallbackBody } from './get-attribute-changed-callback-body.js'

export const compile = (name: string, program: Program): Program => {
  const imports: ImportDeclaration[] = []
  const exports: ExportNamedDeclaration[] = []
  const fragment: (Statement | Element)[] = []

  for (const node of program.body) {
    switch (node.type) {
      case 'ImportDeclaration':
        imports.push(node)
        break
      case 'ExportNamedDeclaration':
        exports.push(node)
        break
      case 'ExportDefaultDeclaration':
        throw new Error('ExportDefaultDeclaration is not supported')
      case 'ExportAllDeclaration':
        throw new Error('ExportAllDeclaration is not supported')
      default:
        fragment.push(node)
        break
    }
  }

  const props = getProps(exports)

  return getComponentBoilerplate({
    name,
    imports,
    observedAttributes: getObservedAttributes(props),
    classConstructorBody: [...getScopeDefinitions(props), getPropertyDefinitions(props)],
    classPropertyDefinitions: [...getPublicInstanceFields(props)],
    attributeChangedCallbackBody: [...getAttributeChangedCallbackBody(props)],
  })
}
