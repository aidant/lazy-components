import * as acorn from 'acorn'
import * as svelte from 'svelte/compiler'
import ts from 'typescript'
import { Program, Type } from '../ast.js'

export const parser = (source: string): Program => {
  const separatorIndex = source.search(/^</m)

  const sourceTypeScript = source.substring(0, separatorIndex)
  const sourceTemplate = source.substring(separatorIndex)

  const sourceJavaScript = ts.transpileModule(sourceTypeScript, {
    compilerOptions: { target: ts.ScriptTarget.ESNext },
  }).outputText

  const astJavaScript = acorn.parse(sourceJavaScript, {
    ecmaVersion: 'latest',
    sourceType: 'module',
  })
  const astTemplate = svelte.parse(sourceTemplate)

  return {
    type: Type.Program,
    sourceType: 'module',
    body: [
      ...astJavaScript.body,
      astTemplate.html,
    ],
  }
}
