import { Attribute, DataBinding, Element, Literal, Node } from '@lazy/ast'
import { parse } from 'svelte/compiler'
import { TemplateNode } from 'svelte/types/compiler/interfaces'

const parseTemplateNode = (node: TemplateNode): Node => {
  switch (node.type) {
    case 'Element': {
      const element: Element = {
        type: 'Element',
        tag: node.name,
        attributes: node.attributes.map(parseTemplateNode),
        children: (node.children || []).map(parseTemplateNode) as Element['children'],
      }
      return element
    }

    case 'Attribute': {
      const attribute: Attribute = {
        type: 'Attribute',
        name: node.name,
        value: node.value.map(parseTemplateNode),
      }
      return attribute
    }

    case 'Text': {
      const literal: Literal = {
        type: 'Literal',
        value: node.data,
      }
      return literal
    }

    case 'MustacheTag': {
      const dataBinding: DataBinding = {
        type: 'DataBinding',
        expression: node.expression,
      }
      return dataBinding
    }

    default:
      throw new Error(`Unknown template node type: ${node.type}`)
  }
}

export const parseTemplate = (source: string): Element[] => {
  return (parse(source).html.children || []).map(parseTemplateNode) as Element[]
}
