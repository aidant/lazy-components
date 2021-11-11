import { parse } from 'svelte/compiler'

export const parseTemplate = (source: string): any[] => {
  return [parse(source).html]
}