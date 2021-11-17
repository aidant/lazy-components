import _ from 'lodash'

export const toUpperCamelCase = (string: string): string => {
  return _.upperFirst(_.camelCase(string))
}
