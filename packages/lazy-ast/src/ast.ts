/*
  ESTree 
*/

export interface Node {
  type: string
  // loc: SourceLocation | null
}

export interface SourceLocation {
  source: string | null
  start: Position
  end: Position
}

export interface Position {
  line: number
  column: number
}

export interface Identifier extends Node {
  type: 'Identifier'
  name: string
  // typeAnnotation: TypeAnnotation | null
}

export interface Literal extends Node {
  type: 'Literal'
  value: string | boolean | null | number | RegExp | bigint
}

export interface RegExpLiteral extends Literal {
  regex: {
    pattern: string
    flags: string
  }
}

export interface BigIntLiteral extends Literal {
  bigint: string
}

export interface Program extends Node {
  type: 'Program'
  sourceType: 'script' | 'module'
  body: (ModuleDeclaration | Statement | Element /* Lazy Component Extension */)[]
}

export interface Function extends Node {
  id: Identifier | null
  params: Pattern[]
  body: FunctionBody
  generator: boolean
  async: boolean
  // returnType: TypeAnnotation | null
}

export type Statement =
  | ExpressionStatement
  | BlockStatement
  | EmptyStatement
  | DebuggerStatement
  | WithStatement
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
  | ForOfStatement
  | Declaration

export interface ExpressionStatement extends Node {
  type: 'ExpressionStatement'
  expression: Expression
}

interface Directive extends Node {
  type: 'ExpressionStatement'
  expression: Literal
  directive: string
}

export interface BlockStatement extends Node {
  type: 'BlockStatement'
  body: Statement[]
}

export interface FunctionBody extends BlockStatement {}

export interface EmptyStatement extends Node {
  type: 'EmptyStatement'
}

export interface DebuggerStatement extends Node {
  type: 'DebuggerStatement'
}

interface WithStatement extends Node {
  type: 'WithStatement'
  object: Expression
  body: Statement
}

export interface ReturnStatement extends Node {
  type: 'ReturnStatement'
  argument: Expression | null
}

export interface LabeledStatement extends Node {
  type: 'LabeledStatement'
  label: Identifier
  body: Statement
}

export interface BreakStatement extends Node {
  type: 'BreakStatement'
  label: Identifier | null
}

export interface ContinueStatement extends Node {
  type: 'ContinueStatement'
  label: Identifier | null
}

export interface IfStatement extends Node {
  type: 'IfStatement'
  test: Expression
  consequent: Statement
  alternate: Statement | null
}

export interface SwitchStatement extends Node {
  type: 'SwitchStatement'
  discriminant: Expression
  cases: SwitchCase[]
}

export interface SwitchCase extends Node {
  type: 'SwitchCase'
  test: Expression | null
  consequent: Statement[]
}

export interface ThrowStatement extends Node {
  type: 'ThrowStatement'
  argument: Expression
}

export interface TryStatement extends Node {
  type: 'TryStatement'
  block: BlockStatement
  handler: CatchClause | null
  finalizer: BlockStatement | null
}

export interface CatchClause extends Node {
  type: 'CatchClause'
  param: Pattern | null
  body: BlockStatement
}

export interface WhileStatement extends Node {
  type: 'WhileStatement'
  test: Expression
  body: Statement
}

export interface DoWhileStatement extends Node {
  type: 'DoWhileStatement'
  body: Statement
  test: Expression
}

export interface ForStatement extends Node {
  type: 'ForStatement'
  init: VariableDeclaration | Expression | null
  test: Expression | null
  update: Expression | null
  body: Statement
}

export interface ForInStatement extends Node {
  type: 'ForInStatement'
  left: VariableDeclaration | Pattern
  right: Expression
  body: Statement
}

export interface ForOfStatement extends Omit<ForInStatement, 'type'> {
  type: 'ForOfStatement'
  await: boolean
}

export type Declaration = FunctionDeclaration | VariableDeclaration | ClassDeclaration

export interface FunctionDeclaration extends Function {
  type: 'FunctionDeclaration'
  id: Identifier
}

export interface VariableDeclaration {
  type: 'VariableDeclaration'
  declarations: VariableDeclarator[]
  kind: 'var' | 'let' | 'const'
}

export interface VariableDeclarator extends Node {
  type: 'VariableDeclarator'
  id: Pattern
  init: Expression | null
}

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

export interface ThisExpression extends Node {
  type: 'ThisExpression'
}

export interface ArrayExpression extends Node {
  type: 'ArrayExpression'
  elements: (Expression | SpreadElement | null)[]
}

export interface ObjectExpression extends Node {
  type: 'ObjectExpression'
  properties: (Property | SpreadElement)[]
}

export interface Property extends Node {
  type: 'Property'
  key: Expression
  value: Expression
  kind: 'init' | 'get' | 'set'
  method: boolean
  computed: boolean
  shorthand: boolean
}

export interface FunctionExpression extends Function {
  type: 'FunctionExpression'
}

export interface UnaryExpression extends Node {
  type: 'UnaryExpression'
  operator: UnaryOperator
  prefix: boolean
  argument: Expression
}

export type UnaryOperator =
  | '+'
  | '-'
  | '~'
  | '!'
  | 'typeof'
  | 'void'
  | 'delete'

export interface UpdateExpression extends Node {
  type: 'UpdateExpression'
  operator: UpdateOperator
  argument: Expression
  prefix: boolean
}

export type UpdateOperator =
  | '++'
  | '--'

export interface BinaryExpression extends Node {
  type: 'BinaryExpression'
  operator: BinaryOperator
  left: Expression | PrivateIdentifier
  right: Expression
}

export type BinaryOperator =
  | '=='
  | '!='
  | '==='
  | '!=='
  | '<'
  | '<='
  | '>'
  | '>='
  | '<<'
  | '>>'
  | '>>>'
  | '+'
  | '-'
  | '*'
  | '/'
  | '%'
  | '|'
  | '^'
  | '&'
  | 'in'
  | 'instanceof'
  | '**'

export interface AssignmentExpression extends Node {
  type: 'AssignmentExpression'
  operator: AssignmentOperator
  left: Pattern
  right: Expression
}

export type AssignmentOperator =
  | '='
  | '+='
  | '-='
  | '*='
  | '/='
  | '%='
  | '<<='
  | '>>='
  | '>>>='
  | '|='
  | '^='
  | '&='
  | '**='
  | '||='
  | '&&='
  | '??='

export interface LogicalExpression extends Node {
  type: 'LogicalExpression'
  operator: LogicalOperator
  left: Expression
  right: Expression
}

export type LogicalOperator =
  | '||'
  | '&&'
  | '??'

export interface MemberExpression extends Node, ChainElement {
  type: 'MemberExpression'
  object: Expression | Super
  property: Expression | PrivateIdentifier
  computed: boolean
}

export interface ConditionalExpression extends Node {
  type: 'ConditionalExpression'
  test: Expression
  consequent: Expression
  alternate: Expression
}

export interface CallExpression extends Node, ChainElement {
  type: 'CallExpression'
  callee: Expression | Super
  arguments: (Expression | SpreadElement)[]
}

export interface NewExpression extends Node {
  type: 'NewExpression'
  callee: Expression
  arguments: (Expression | SpreadElement)[]
}

export interface SequenceExpression extends Node {
  type: 'SequenceExpression'
  expressions: Expression[]
}

export interface Super extends Node {
  type: 'Super'
}

export interface SpreadElement extends Node {
  type: 'SpreadElement'
  argument: Expression
}

export interface ArrowFunctionExpression extends Omit<Function, 'body'> {
  type: 'ArrowFunctionExpression'
  body: FunctionBody | Expression
  expression: boolean
}

export interface YieldExpression extends Node {
  type: 'YieldExpression'
  argument: Expression | null
  delegate: boolean
}

export interface TemplateLiteral extends Node {
  type: 'TemplateLiteral'
  quasis: TemplateElement[]
  expressions: Expression[]
}

export interface TaggedTemplateExpression extends Node {
  type: 'TaggedTemplateExpression'
  tag: Expression
  quasi: TemplateLiteral
}

export interface TemplateElement extends Node {
  type: 'TemplateElement'
  tail: boolean
  value: {
    cooked: string | null
    raw: string
  }
}

export interface AwaitExpression extends Node {
  type: 'AwaitExpression'
  argument: Expression
}

export interface ImportExpression extends Node {
  type: 'ImportExpression'
  source: Expression
}

export type Pattern = Identifier | ObjectPattern | ArrayPattern | RestElement | AssignmentPattern | MemberExpression

export interface AssignmentProperty extends Omit<Property, 'value'> {
  value: Pattern
  kind: 'init'
  method: false
}

export interface ObjectPattern extends Node {
  type: 'ObjectPattern'
  properties: (AssignmentProperty | RestElement)[]
  // typeAnnotation: TypeAnnotation | null
}

export interface ArrayPattern extends Node {
  type: 'ArrayPattern'
  elements: (Pattern | null)[]
  // typeAnnotation: TypeAnnotation | null
}

export interface RestElement extends Node {
  type: 'RestElement'
  argument: Pattern
  // typeAnnotation: TypeAnnotation | null
}

export interface AssignmentPattern extends Node {
  type: 'AssignmentPattern'
  left: Pattern
  right: Expression
}

export interface Class extends Node {
  id: Identifier | null
  superClass: Expression | null
  body: ClassBody
}

export interface ClassBody extends Node {
  type: 'ClassBody'
  body: (MethodDefinition | PropertyDefinition | StaticBlock)[]
}

export interface MethodDefinition extends Node {
  type: 'MethodDefinition'
  key: Expression | PrivateIdentifier
  value: FunctionExpression
  kind: 'constructor' | 'method' | 'get' | 'set'
  computed: boolean
  static: boolean
}

export interface ClassDeclaration extends Class {
  type: 'ClassDeclaration'
  id: Identifier
}

export interface ClassExpression extends Class {
  type: 'ClassExpression'
}

export interface MetaProperty extends Node {
  type: 'MetaProperty'
  meta: Identifier
  property: Identifier
}

export type ModuleDeclaration =
  | ImportDeclaration
  | ExportNamedDeclaration
  | ExportDefaultDeclaration
  | ExportAllDeclaration

export interface ModuleSpecifier extends Node {
  local: Identifier
}

export interface ImportDeclaration extends Node {
  type: 'ImportDeclaration'
  specifiers: (ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier)[]
  source: Literal
}

export interface ImportSpecifier extends ModuleSpecifier {
  type: 'ImportSpecifier'
  imported: Identifier
}

export interface ImportDefaultSpecifier extends ModuleSpecifier {
  type: 'ImportDefaultSpecifier'
}

export interface ImportNamespaceSpecifier extends ModuleSpecifier {
  type: 'ImportNamespaceSpecifier'
}

export interface ExportNamedDeclaration extends Node {
  type: 'ExportNamedDeclaration'
  declaration: Declaration | null
  specifiers: ExportSpecifier[]
  source: Literal | null
}

export interface ExportSpecifier extends ModuleSpecifier {
  type: 'ExportSpecifier'
  exported: Identifier
}

export interface AnonymousDefaultExportedFunctionDeclaration
  extends Omit<FunctionDeclaration, 'id'> {
  type: 'FunctionDeclaration'
  id: null
}

export interface AnonymousDefaultExportedClassDeclaration extends Omit<ClassDeclaration, 'id'> {
  type: 'ClassDeclaration'
  id: null
}

export interface ExportDefaultDeclaration extends Node {
  type: 'ExportDefaultDeclaration'
  declaration:
    | AnonymousDefaultExportedFunctionDeclaration
    | FunctionDeclaration
    | AnonymousDefaultExportedClassDeclaration
    | ClassDeclaration
    | Expression
}

export interface ExportAllDeclaration extends Node {
  type: 'ExportAllDeclaration'
  source: Literal
  exported: Identifier | null
}

export interface ChainExpression extends Node {
  type: 'ChainExpression'
  expression: ChainElement
}

export interface ChainElement extends Node {
  optional: boolean
}

export interface PropertyDefinition extends Node {
  type: 'PropertyDefinition'
  key: Expression | PrivateIdentifier
  value: Expression | null
  computed: boolean
  static: boolean
}

export interface PrivateIdentifier extends Node {
  type: 'PrivateIdentifier'
  name: string
}

export interface StaticBlock extends Omit<BlockStatement, 'type'> {
  type: 'StaticBlock'
}

export interface TypeAnnotation extends Node {
  type: 'TypeAnnotation'
}

/*
  Lazy Components
*/

export interface Element extends Node {
  type: 'Element'
  tag: string
  attributes: Attribute[]
  children: (Literal | DataBinding | Element)[]
}

export interface Attribute extends Node {
  type: 'Attribute'
  name: string
  value: (Literal | DataBinding)[]
}

export interface DataBinding extends Node {
  type: 'DataBinding'
  expression: Expression
}
