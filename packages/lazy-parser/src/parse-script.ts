import { parse } from '@babel/parser'
import { walk } from 'estree-walker'
import { Statement, ModuleDeclaration } from '@lazy/ast'

export const parseScript = (source: string): (Statement | ModuleDeclaration)[] => {
  const ast = parse(source, {
    sourceType: 'module',
    plugins: ['estree', 'typescript'],
  }).program.body

  return walk(ast, {
    leave: (node: any) => {
      delete node.start
      delete node.end
      delete node.loc

      if (node.type === 'Literal') {
        delete node.raw
      }

      if (node.type === 'ExportNamedDeclaration') {
        delete node.exportKind
      }

      return node
    },
  })
}
