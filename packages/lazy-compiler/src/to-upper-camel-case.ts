export const toUpperCamelCase = (kebabCase: string): string => {
  return kebabCase.replace(/(?:^|-)(\w)/g, (_, c) => c.toUpperCase())
}