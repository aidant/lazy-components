import _ from 'lodash'

export const toUpperCamelCase = (string: string): string => {
  return _.capitalize(_.camelCase(string))
}
