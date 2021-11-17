import {
  ExpressionStatement,
  ImportDeclaration,
  Literal,
  MethodDefinition,
  Program,
  PropertyDefinition,
  Statement,
} from '@lazy/ast'
import { toUpperCamelCase } from './to-upper-camel-case.js'

export interface ComponentBoilerplateOptions {
  name: string
  imports?: ImportDeclaration[]
  observedAttributes?: Literal[]
  classMethodDefinitions?: MethodDefinition[]
  classConstructorBody?: Statement[]
  classPropertyDefinitions?: PropertyDefinition[]
  attributeChangedCallbackBody?: ExpressionStatement[]
}

export const getComponentBoilerplate = ({
  name,
  imports = [],
  observedAttributes = [],
  classMethodDefinitions = [],
  classConstructorBody = [],
  classPropertyDefinitions = [],
  attributeChangedCallbackBody = [],
}: ComponentBoilerplateOptions): Program => {
  return {
    type: 'Program',
    sourceType: 'module',
    body: [
      ...imports,
      {
        type: 'ExportNamedDeclaration',
        declaration: {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: toUpperCamelCase(name),
          },
          superClass: {
            type: 'Identifier',
            name: 'HTMLElement',
          },
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                static: true,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'observedAttributes',
                },
                kind: 'get',
                value: {
                  type: 'FunctionExpression',
                  id: null,
                  generator: false,
                  async: false,
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ReturnStatement',
                        argument: {
                          type: 'ArrayExpression',
                          elements: observedAttributes,
                        },
                      },
                    ],
                  },
                },
              },
              ...classPropertyDefinitions,
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor',
                },
                static: false,
                value: {
                  type: 'FunctionExpression',
                  async: false,
                  id: null,
                  generator: false,
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Super',
                          },
                          arguments: [],
                          optional: false,
                        },
                      },
                      ...classConstructorBody,
                    ],
                  },
                },
              },
              {
                type: 'MethodDefinition',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'connectedCallback',
                },
                kind: 'method',
                value: {
                  type: 'FunctionExpression',
                  id: null,
                  generator: false,
                  async: false,
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [],
                  },
                },
              },
              {
                type: 'MethodDefinition',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'attributeChangedCallback',
                },
                kind: 'method',
                value: {
                  type: 'FunctionExpression',
                  id: null,
                  generator: false,
                  async: false,
                  params: [
                    {
                      type: 'Identifier',
                      name: 'name',
                    },
                    {
                      type: 'Identifier',
                      name: 'oldValue',
                    },
                    {
                      type: 'Identifier',
                      name: 'newValue',
                    },
                  ],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      ...attributeChangedCallbackBody,
                    ],
                  },
                },
              },
              {
                type: 'MethodDefinition',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'disconnectedCallback',
                },
                kind: 'method',
                value: {
                  type: 'FunctionExpression',
                  id: null,
                  generator: false,
                  async: false,
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [],
                  },
                },
              },
              ...classMethodDefinitions,
            ],
          },
        },
        specifiers: [],
        source: null,
      },
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'customElements',
            },
            property: {
              type: 'Identifier',
              name: 'define',
            },
            computed: false,
            optional: false,
          },
          arguments: [
            {
              type: 'Literal',
              value: name,
            },
            {
              type: 'Identifier',
              name: toUpperCamelCase(name),
            },
          ],
          optional: false,
        },
      },
    ],
  }
}
