import { ExportNamedDeclaration, Expression } from '@lazy/ast'

export interface Prop {
  externalName: string
  internalName: string
  initialValue: Expression | null
  constant: boolean
}

export const getProps = (exportNamedDeclarations: ExportNamedDeclaration[]): Prop[] => {
  const props: Prop[] = []

  for (const exportNamedDeclaration of exportNamedDeclarations) {
    if (exportNamedDeclaration.declaration) {
      const deceleration = exportNamedDeclaration.declaration

      switch (deceleration.type) {
        case 'VariableDeclaration': {
          for (const variable of deceleration.declarations) {
            const identifier = variable.id

            if (identifier.type !== 'Identifier') {
              throw new Error('Unexpected Variable Declarator')
            }

            props.push({
              externalName: identifier.name,
              internalName: identifier.name,
              initialValue: variable.init,
              constant: deceleration.kind === 'const',
            })
          }

          break
        }

        case 'FunctionDeclaration': {
          props.push({
            externalName: deceleration.id.name,
            internalName: deceleration.id.name,
            initialValue: {
              type: 'FunctionExpression',
              id: deceleration.id,
              params: deceleration.params,
              body: deceleration.body,
              async: deceleration.async,
              generator: deceleration.generator,
            },
            constant: true,
          })

          break
        }

        default:
          throw new Error(`Unexpected declaration type: ${deceleration.type}`)
      }
    } else if (exportNamedDeclaration.specifiers) {
      for (const specifier of exportNamedDeclaration.specifiers) {
        if (specifier.type !== 'ExportSpecifier') {
          throw new Error('Unexpected Export Specifier')
        }

        props.push({
          externalName: specifier.exported.name,
          internalName: specifier.local.name,
          initialValue: specifier.local,
          constant: true,
        })
      }
    } else {
      throw new Error('Unexpected Export Named Declaration')
    }
  }

  return props
}
