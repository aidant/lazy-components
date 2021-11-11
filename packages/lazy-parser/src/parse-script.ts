import { parse } from '@babel/parser'
import { Statement, ModuleDeclaration } from '@lazy/ast'

export const parseScript = (source: string): (Statement | ModuleDeclaration)[] => {
  return parse(source, { sourceType: 'module', plugins: ['typescript'] }).program.body as unknown as (Statement | ModuleDeclaration)[]
}
