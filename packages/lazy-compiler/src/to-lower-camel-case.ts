import _ from 'lodash'

export const toLowerCamelCase = (string: string): string => {
  return _.camelCase(string)
}
