export enum Type {
  Identifier = 'Identifier',
  Literal = 'Literal',
  Program = 'Program',
  ExpressionStatement = 'ExpressionStatement',
  BlockStatement = 'BlockStatement',
  EmptyStatement = 'EmptyStatement',
  DebuggerStatement = 'DebuggerStatement',
  ReturnStatement = 'ReturnStatement',
  LabeledStatement = 'LabeledStatement',
  BreakStatement = 'BreakStatement',
  ContinueStatement = 'ContinueStatement',
  IfStatement = 'IfStatement',
  SwitchStatement = 'SwitchStatement',
  SwitchCase = 'SwitchCase',
  ThrowStatement = 'ThrowStatement',
  TryStatement = 'TryStatement',
  CatchClause = 'CatchClause',
  WhileStatement = 'WhileStatement',
  DoWhileStatement = 'DoWhileStatement',
  ForStatement = 'ForStatement',
  ForInStatement = 'ForInStatement',
  ForOfStatement = 'ForOfStatement',
  FunctionDeclaration = 'FunctionDeclaration',
  VariableDeclaration = 'VariableDeclaration',
  VariableDeclarator = 'VariableDeclarator',
  ThisExpression = 'ThisExpression',
  ArrayExpression = 'ArrayExpression',
  ObjectExpression = 'ObjectExpression',
  Property = 'Property',
  FunctionExpression = 'FunctionExpression',
  UnaryExpression = 'UnaryExpression',
  UpdateExpression = 'UpdateExpression',
  BinaryExpression = 'BinaryExpression',
  AssignmentExpression = 'AssignmentExpression',
  LogicalExpression = 'LogicalExpression',
  MemberExpression = 'MemberExpression',
  ConditionalExpression = 'ConditionalExpression',
  CallExpression = 'CallExpression',
  NewExpression = 'NewExpression',
  SequenceExpression = 'SequenceExpression',
  Super = 'Super',
  SpreadElement = 'SpreadElement',
  ArrowFunctionExpression = 'ArrowFunctionExpression',
  YieldExpression = 'YieldExpression',
  TemplateLiteral = 'TemplateLiteral',
  TaggedTemplateExpression = 'TaggedTemplateExpression',
  TemplateElement = 'TemplateElement',
  ObjectPattern = 'ObjectPattern',
  ArrayPattern = 'ArrayPattern',
  RestElement = 'RestElement',
  AssignmentPattern = 'AssignmentPattern',
  ClassBody = 'ClassBody',
  MethodDefinition = 'MethodDefinition',
  ClassDeclaration = 'ClassDeclaration',
  ClassExpression = 'ClassExpression',
  MetaProperty = 'MetaProperty',
  ImportDeclaration = 'ImportDeclaration',
  ImportSpecifier = 'ImportSpecifier',
  ImportDefaultSpecifier = 'ImportDefaultSpecifier',
  ImportNamespaceSpecifier = 'ImportNamespaceSpecifier',
  ExportNamedDeclaration = 'ExportNamedDeclaration',
  ExportSpecifier = 'ExportSpecifier',
  ExportDefaultDeclaration = 'ExportDefaultDeclaration',
  ExportAllDeclaration = 'ExportAllDeclaration',
  AwaitExpression = 'AwaitExpression',
  ChainExpression = 'ChainExpression',
  ImportExpression = 'ImportExpression',
  PropertyDefinition = 'PropertyDefinition',
  PrivateIdentifier = 'PrivateIdentifier',
  StaticBlock = 'StaticBlock',
  TypeAnnotation = 'TypeAnnotation',
}

export interface Node {
  type: Type
}

export type Pattern = Identifier | ObjectPattern | ArrayPattern | RestElement | AssignmentPattern

export type Expression =
  | Identifier
  | Literal
  | ThisExpression
  | ArrayExpression
  | ObjectExpression
  | UnaryExpression
  | UpdateExpression
  | BinaryExpression
  | AssignmentExpression
  | LogicalExpression
  | MemberExpression
  | ConditionalExpression
  | CallExpression
  | NewExpression
  | SequenceExpression
  | YieldExpression
  | TemplateLiteral
  | TaggedTemplateExpression
  | AwaitExpression
  | ChainExpression
  | ImportExpression
  | FunctionExpression
  | ArrowFunctionExpression
  | ClassExpression

export type Statement =
  | ExpressionStatement
  | BlockStatement
  | EmptyStatement
  | DebuggerStatement
  | ReturnStatement
  | LabeledStatement
  | BreakStatement
  | ContinueStatement
  | IfStatement
  | SwitchStatement
  | ThrowStatement
  | TryStatement
  | WhileStatement
  | DoWhileStatement
  | ForStatement
  | ForInStatement

export type Declaration = FunctionDeclaration | VariableDeclaration | ClassDeclaration

export interface Identifier extends Node {
  type: Type.Identifier
  name: string
  typeAnnotation: TypeAnnotation | null
}

export interface Literal extends Node {
  type: Type.Literal
  value: string | boolean | null | number | RegExp | bigint
}

export interface RegExpLiteral extends Literal {
  type: Type.Literal
  value: RegExp
  regex: {
    pattern: string
    flags: string
  }
}

export interface Program extends Node {
  type: Type.Program
  sourceType: 'script' | 'module'
  body: (Statement | ModuleDeclaration)[]
}

export interface Function extends Node {
  id: Identifier | null
  params: Pattern[]
  body: FunctionBody
  generator: boolean
  async: boolean
  returnType: TypeAnnotation | null
}

export interface ExpressionStatement extends Node {
  type: Type.ExpressionStatement
  expression: Expression
}

export interface BlockStatement extends Node {
  type: Type.BlockStatement
  body: Statement[]
}

export interface FunctionBody extends BlockStatement {}

export interface EmptyStatement extends Node {
  type: Type.EmptyStatement
}

export interface DebuggerStatement extends Node {
  type: Type.DebuggerStatement
}

export interface ReturnStatement extends Node {
  type: Type.ReturnStatement
  argument: Expression | null
}

export interface LabeledStatement extends Node {
  type: Type.LabeledStatement
  label: Identifier
  body: Statement
}

export interface BreakStatement extends Node {
  type: Type.BreakStatement
  label: Identifier | null
}

export interface ContinueStatement extends Node {
  type: Type.ContinueStatement
  label: Identifier | null
}

export interface IfStatement extends Node {
  type: Type.IfStatement
  test: Expression
  consequent: Statement
  alternate: Statement | null
}

export interface SwitchStatement extends Node {
  type: Type.SwitchStatement
  discriminant: Expression
  cases: SwitchCase[]
}

export interface SwitchCase extends Node {
  type: Type.SwitchCase
  test: Expression | null
  consequent: Statement[]
}

export interface ThrowStatement extends Node {
  type: Type.ThrowStatement
  argument: Expression
}

export interface TryStatement extends Node {
  type: Type.TryStatement
  block: BlockStatement
  handler: CatchClause | null
  finalizer: BlockStatement | null
}

export interface CatchClause extends Node {
  type: Type.CatchClause
  param: Pattern | null
  body: BlockStatement
}

export interface WhileStatement extends Node {
  type: Type.WhileStatement
  test: Expression
  body: Statement
}

export interface DoWhileStatement extends Node {
  type: Type.DoWhileStatement
  body: Statement
  test: Expression
}

export interface ForStatement extends Node {
  type: Type.ForStatement
  init: VariableDeclaration | Expression | null
  test: Expression | null
  update: Expression | null
  body: Statement
}

export interface ForInStatement extends Node {
  type: Type.ForInStatement
  left: VariableDeclaration | Pattern
  right: Expression
  body: Statement
}

export interface ForOfStatement extends Omit<ForInStatement, 'type'> {
  type: Type.ForOfStatement
  await: boolean
}

export interface FunctionDeclaration extends Function {
  type: Type.FunctionDeclaration
  id: Identifier
}

export interface VariableDeclaration {
  type: Type.VariableDeclaration
  declarations: VariableDeclarator[]
  kind: 'var' | 'let' | 'const'
}

export interface VariableDeclarator extends Node {
  type: Type.VariableDeclarator
  id: Pattern
  init: Expression | null
}

export interface ThisExpression extends Node {
  type: Type.ThisExpression
}

export interface ArrayExpression extends Node {
  type: Type.ArrayExpression
  elements: (Expression | SpreadElement | null)[]
}

export interface ObjectExpression extends Node {
  type: Type.ObjectExpression
  properties: (Property | SpreadElement)[]
}

export interface Property extends Node {
  type: Type.Property
  key: Expression
  value: Expression
  kind: 'init' | 'get' | 'set'
  method: boolean
  computed: boolean
  shorthand: boolean
}

export interface FunctionExpression extends Function {
  type: Type.FunctionExpression
}

export interface UnaryExpression extends Node {
  type: Type.UnaryExpression
  operator: UnaryOperator
  prefix: boolean
  argument: Expression
}

export enum UnaryOperator {
  '+' = '+',
  '-' = '-',
  '~' = '~',
  '!' = '!',
  typeof = 'typeof',
  void = 'void',
  delete = 'delete',
}

export interface UpdateExpression extends Node {
  type: Type.UpdateExpression
  operator: UpdateOperator
  argument: Expression
  prefix: boolean
}

export enum UpdateOperator {
  '++' = '++',
  '--' = '--',
}

export interface BinaryExpression extends Node {
  type: Type.BinaryExpression
  operator: BinaryOperator
  left: Expression | PrivateIdentifier
  right: Expression
}

export enum BinaryOperator {
  '==' = '==',
  '!=' = '!=',
  '===' = '===',
  '!==' = '!==',
  '<' = '<',
  '<=' = '<=',
  '>' = '>',
  '>=' = '>=',
  '<<' = '<<',
  '>>' = '>>',
  '>>>' = '>>>',
  '+' = '+',
  '-' = '-',
  '*' = '*',
  '/' = '/',
  '%' = '%',
  '|' = '|',
  '^' = '^',
  '&' = '&',
  'in' = 'in',
  'instanceof' = 'instanceof',
  '**' = '**',
}

export interface AssignmentExpression extends Node {
  type: Type.AssignmentExpression
  operator: AssignmentOperator
  left: Pattern
  right: Expression
}

export enum AssignmentOperator {
  '=' = '=',
  '+=' = '+=',
  '-=' = '-=',
  '*=' = '*=',
  '/=' = '/=',
  '%=' = '%=',
  '<<=' = '<<=',
  '>>=' = '>>=',
  '>>>=' = '>>>=',
  '|=' = '|=',
  '^=' = '^=',
  '&=' = '&=',
  '**=' = '**=',
  '||=' = '||=',
  '&&=' = '&&=',
  '??=' = '??=',
}

export interface LogicalExpression extends Node {
  type: Type.LogicalExpression
  operator: LogicalOperator
  left: Expression
  right: Expression
}

export enum LogicalOperator {
  '||' = '||',
  '&&' = '&&',
  '??' = '??',
}

export interface MemberExpression extends Node, ChainElement {
  type: Type.MemberExpression
  object: Expression | Super
  property: Expression | PrivateIdentifier
  computed: boolean
}

export interface ConditionalExpression extends Node {
  type: Type.ConditionalExpression
  test: Expression
  consequent: Expression
  alternate: Expression
}

export interface CallExpression extends Node, ChainElement {
  type: Type.CallExpression
  callee: Expression | Super
  arguments: (Expression | SpreadElement)[]
}

export interface NewExpression extends Node {
  type: Type.NewExpression
  callee: Expression
  arguments: (Expression | SpreadElement)[]
}

export interface SequenceExpression extends Node {
  type: Type.SequenceExpression
  expressions: Expression[]
}

export interface Super extends Node {
  type: Type.Super
}

export interface SpreadElement extends Node {
  type: Type.SpreadElement
  argument: Expression
}

export interface ArrowFunctionExpression extends Omit<Function, 'body'> {
  type: Type.ArrowFunctionExpression
  body: FunctionBody | Expression
  expression: boolean
}

export interface YieldExpression extends Node {
  type: Type.YieldExpression
  argument: Expression | null
  delegate: boolean
}

export interface TemplateLiteral extends Node {
  type: Type.TemplateLiteral
  quasis: TemplateElement[]
  expressions: Expression[]
}

export interface TaggedTemplateExpression extends Node {
  type: Type.TaggedTemplateExpression
  tag: Expression
  quasi: TemplateLiteral
}

export interface TemplateElement extends Node {
  type: Type.TemplateElement
  tail: boolean
  value: {
    cooked: string | null
    raw: string
  }
}

export interface AssignmentProperty extends Omit<Property, 'value'> {
  value: Pattern
  kind: 'init'
  method: false
}

export interface ObjectPattern extends Node {
  type: Type.ObjectPattern
  properties: (AssignmentProperty | RestElement)[]
  typeAnnotation: TypeAnnotation | null
}

export interface ArrayPattern extends Node {
  type: Type.ArrayPattern
  elements: (Pattern | null)[]
  typeAnnotation: TypeAnnotation | null
}

export interface RestElement extends Node {
  type: Type.RestElement
  argument: Pattern
  typeAnnotation: TypeAnnotation | null
}

export interface AssignmentPattern extends Node {
  type: Type.AssignmentPattern
  left: Pattern
  right: Expression
}

export interface Class extends Node {
  id: Identifier | null
  superClass: Expression | null
  body: ClassBody
}

export interface ClassBody extends Node {
  type: Type.ClassBody
  body: (MethodDefinition | PropertyDefinition | StaticBlock)[]
}

export interface MethodDefinition extends Node {
  type: Type.MethodDefinition
  key: Expression | PrivateIdentifier
  value: FunctionExpression
  kind: 'constructor' | 'method' | 'get' | 'set'
  computed: boolean
  static: boolean
}

export interface ClassDeclaration extends Class {
  type: Type.ClassDeclaration
  id: Identifier
}

export interface ClassExpression extends Class {
  type: Type.ClassExpression
}

export interface MetaProperty extends Node {
  type: Type.MetaProperty
  meta: Identifier
  property: Identifier
}

export interface ModuleDeclaration extends Node {}

export interface ModuleSpecifier extends Node {
  local: Identifier
}

export interface ImportDeclaration extends ModuleDeclaration {
  type: Type.ImportDeclaration
  specifiers: (ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier)[]
  source: Literal
}

export interface ImportSpecifier extends ModuleSpecifier {
  type: Type.ImportSpecifier
  imported: Identifier
}

export interface ImportDefaultSpecifier extends ModuleSpecifier {
  type: Type.ImportDefaultSpecifier
}

export interface ImportNamespaceSpecifier extends ModuleSpecifier {
  type: Type.ImportNamespaceSpecifier
}

export interface ExportNamedDeclaration extends ModuleDeclaration {
  type: Type.ExportNamedDeclaration
  declaration: Declaration | null
  specifiers: ExportSpecifier[]
  source: Literal | null
}

export interface ExportSpecifier extends ModuleSpecifier {
  type: Type.ExportSpecifier
  exported: Identifier
}

export interface AnonymousDefaultExportedFunctionDeclaration extends Omit<FunctionDeclaration, 'id'> {
  type: Type.FunctionDeclaration
  id: null
}

export interface AnonymousDefaultExportedClassDeclaration extends Omit<ClassDeclaration, 'id'> {
  type: Type.ClassDeclaration
  id: null
}

export interface ExportDefaultDeclaration extends ModuleDeclaration {
  type: Type.ExportDefaultDeclaration
  declaration:
    | AnonymousDefaultExportedFunctionDeclaration
    | FunctionDeclaration
    | AnonymousDefaultExportedClassDeclaration
    | ClassDeclaration
    | Expression
}

export interface ExportAllDeclaration extends ModuleDeclaration {
  type: Type.ExportAllDeclaration
  source: Literal
  exported: Identifier | null
}

export interface AwaitExpression extends Node {
  type: Type.AwaitExpression
  argument: Expression
}

export interface BigIntLiteral extends Literal {
  bigint: string
}

export interface ChainExpression extends Node {
  type: Type.ChainExpression
  expression: ChainElement
}

export interface ChainElement extends Node {
  optional: boolean
}

export interface ImportExpression extends Node {
  type: Type.ImportExpression
  source: Expression
}

export interface PropertyDefinition extends Node {
  type: Type.PropertyDefinition
  key: Expression | PrivateIdentifier
  value: Expression | null
  computed: boolean
  static: boolean
}

export interface PrivateIdentifier extends Node {
  type: Type.PrivateIdentifier
  name: string
}

export interface StaticBlock extends Omit<BlockStatement, 'type'> {
  type: Type.StaticBlock
}

export interface TypeAnnotation extends Node {
  type: Type.TypeAnnotation
}
