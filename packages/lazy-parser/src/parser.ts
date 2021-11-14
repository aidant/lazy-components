import { Program } from '@lazy/ast'
import { parseScript } from './parse-script.js'
import { parseTemplate } from './parse-template.js'

export const parser = (source: string): Program => {
  const separatorIndex = source.search(/(?:^|\s+)</m)

  const sourceScript = source.substring(0, separatorIndex)
  const sourceTemplate = source.substring(separatorIndex)

  const astJavaScript = parseScript(sourceScript)
  const astTemplate = parseTemplate(sourceTemplate)

  return {
    type: 'Program',
    sourceType: 'module',
    body: [...astJavaScript, ...astTemplate],
  }
}
