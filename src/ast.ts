export enum Type {
  ArrayExpression = 'ArrayExpression',
  AssignmentExpression = 'AssignmentExpression',
  BinaryExpression = 'BinaryExpression',
  BlockStatement = 'BlockStatement',
  BreakStatement = 'BreakStatement',
  CallExpression = 'CallExpression',
  CatchClause = 'CatchClause',
  ConditionalExpression = 'ConditionalExpression',
  ContinueStatement = 'ContinueStatement',
  DebuggerStatement = 'DebuggerStatement',
  Declaration = 'Declaration',
  DoWhileStatement = 'DoWhileStatement',
  EmptyStatement = 'EmptyStatement',
  Expression = 'Expression',
  ExpressionStatement = 'ExpressionStatement,',
  ForInStatement = 'ForInStatement',
  ForStatement = 'ForStatement',
  Function = 'Function',
  FunctionBody = 'FunctionBody',
  FunctionDeclaration = 'FunctionDeclaration',
  FunctionExpression = 'FunctionExpression',
  Identifier = 'Identifier',
  IfStatement = 'IfStatement',
  LabeledStatement = 'LabeledStatement',
  Literal = 'Literal',
  LogicalExpression = 'LogicalExpression',
  MemberExpression = 'MemberExpression',
  NewExpression = 'NewExpression',
  ObjectExpression = 'ObjectExpression',
  Pattern = 'Pattern',
  Program = 'Program',
  Property = 'Property',
  ReturnStatement = 'ReturnStatement',
  SequenceExpression = 'SequenceExpression',
  Statement = 'Statement',
  SwitchCase = 'SwitchCase',
  SwitchStatement = 'SwitchStatement',
  ThisExpression = 'ThisExpression',
  ThrowStatement = 'ThrowStatement',
  TryStatement = 'TryStatement',
  UnaryExpression = 'UnaryExpression',
  UpdateExpression = 'UpdateExpression',
  VariableDeclaration = 'VariableDeclaration',
  VariableDeclarator = 'VariableDeclarator',
  WhileStatement = 'WhileStatement',
}

export interface Node {
  type: Type
}

export interface Identifier extends Expression, Pattern {
  type: Type.Identifier
  name: string
  typeAnnotation: TypeAnnotation | null
}

export interface Literal extends Expression {
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
  type: Type.Function
  id: Identifier | null
  params: Pattern[]
  body: FunctionBody
  generator: boolean
  async: boolean
  returnType: TypeAnnotation | null;
}

export interface Statement extends Node {
  type: Type.Statement
}

export interface ExpressionStatement extends Statement {
  type: Type.ExpressionStatement,
  expression: Expression
}

export interface BlockStatement extends Statement {
  type: Type.BlockStatement
  body: Statement[]
}

export interface FunctionBody extends BlockStatement {
  type: Type.FunctionBody
}

export interface EmptyStatement extend Statement {
  type: Type.EmptyStatement
}

export interface DebuggerStatement extends Statement {
  type: Type.DebuggerStatement
}

export interface ReturnStatement extends Statement {
  type: Type.ReturnStatement
  argument: Expression | null
}

export interface LabeledStatement extends Statement {
  type: Type.LabeledStatement
  label: Identifier
  body: Statement
}

export interface BreakStatement extends Statement {
  type: Type.BreakStatement
  label: Identifier | null
}

export interface ContinueStatement extends Statement {
  type: Type.ContinueStatement
  label: Identifier | null
}

export interface IfStatement extends Statement {
  type: Type.IfStatement
  test: Expression
  consequent: Statement
  alternate: Statement | null
}

export interface SwitchStatement extends Statement {
  type: Type.SwitchStatement
  discriminant: Expression
  cases: SwitchCase[]
}

export interface SwitchCase extends Node {
  type: Type.SwitchCase
  test: Expression | null
  consequent: Statement[]
}

export interface ThrowStatement extends Statement {
  type: Type.ThrowStatement
  argument: Expression
}

export interface TryStatement extends Statement {
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

export interface WhileStatement extends Statement {
  type: Type.WhileStatement
  test: Expression
  body: Statement
}

export interface DoWhileStatement extends Statement {
  type: Type.DoWhileStatement
  body: Statement
  test: Expression
}

export interface ForStatement extends Statement {
  type: Type.ForStatement
  init: VariableDeclaration | Expression | null
  test: Expression | null
  update: Expression | null
  body: Statement
}

export interface ForInStatement extends Statement {
  type: Type.ForInStatement
  left: VariableDeclaration | Pattern
  right: Expression
  body: Statement
  // each: boolean
}

export interface ForOfStatement extends ForInStatement {
  type: Type.ForOfStatement
  await: boolean
}

export interface Declaration extends Node {
  type: Type.Declaration
}

export interface FunctionDeclaration extends Function, Declaration {
  type: Type.FunctionDeclaration
  id: Identifier
}

export interface VariableDeclaration extends Declaration {
  type: Type.VariableDeclaration
  declarations: VariableDeclarator[]
  kind: 'var' | 'let' | 'const'
}

export interface VariableDeclarator extends Node {
  type: Type.VariableDeclarator
  id: Pattern
  init: Expression | null
}

export interface Expression extends Node {
  type: Type.Expression
}

export interface ThisExpression extends Expression {
  type: Type.ThisExpression
}

export interface ArrayExpression extends Expression {
  type: Type.ArrayExpression
  elements: (Expression | SpreadElement | null)[]
}

export interface ObjectExpression extends Expression {
  type: Type.ObjectExpression
  properties: (Property | SpreadElement)[]
}

export interface Property extends Node {
  type: Type.Property
  key: Property // Literal | Identifier
  value: Expression
  kind: 'init' | 'get' | 'set'
  method: boolean
  computed: boolean
  shorthand: boolean
}

export interface FunctionExpression extends Function, Expression {
  type: Type.FunctionExpression
}

export interface UnaryExpression extends Expression {
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

export interface UpdateExpression extends Expression {
  type: Type.UpdateExpression
  operator: UpdateOperator
  argument: Expression
  prefix: boolean
}

export enum UpdateOperator {
  '++' = '++',
  '--' = '--',
}

export interface BinaryExpression extends Expression {
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

export interface AssignmentExpression extends Expression {
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

export interface LogicalExpression extends Expression {
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

export interface MemberExpression extends Expression, ChainElement {
  type: Type.MemberExpression
  object: Expression | Super
  property: Expression | PrivateIdentifier
  computed: boolean
}

export interface ConditionalExpression extends Expression {
  type: Type.ConditionalExpression
  test: Expression
  consequent: Expression
  alternate: Expression
}

export interface CallExpression extends Expression, ChainElement {
  type: Type.CallExpression
  callee: Expression | Super
  arguments: (Expression | SpreadElement)[]
}

export interface NewExpression extends Expression {
  type: Type.NewExpression
  callee: Expression
  arguments: (Expression | SpreadElement)[]
}

export interface SequenceExpression extends Expression {
  type: Type.SequenceExpression
  expressions: Expression[]
}

export interface Pattern extends Node {
  type: Type.Pattern
}

export interface Super extends Node {
  type: Type.Super
}

export interface SpreadElement extends Node {
  type: Type.SpreadElement
  argument: Expression
}

export interface ArrowFunctionExpression extends Function, Expression {
  type: Type.ArrowFunctionExpression
  body: FunctionBody | Expression;
  expression: boolean;
}

export interface YieldExpression extends Expression {
  type: Type.YieldExpression
  argument: Expression | null
  delegate: boolean
}

export interface TemplateLiteral extends Expression {
  type: Type.TemplateLiteral
  quasis: TemplateElement[]
  expressions: Expression[]
}

export interface TaggedTemplateExpression extends Expression {
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

export interface AssignmentProperty extends Property {
  // type: Type.AssignmentProperty
  value: Pattern;
  kind: "init";
  method: false;
}

export interface ObjectPattern extends Pattern {
  type: Type.ObjectPattern
  properties: (AssignmentProperty | RestElement)[] // (AssignmentProperty | Property | SpreadElement)[]
  typeAnnotation: TypeAnnotation | null;
}

export interface ArrayPattern extends Pattern {
  type: Type.ArrayPattern
  elements: (Pattern | null)[]
  typeAnnotation: TypeAnnotation | null;
}

export interface RestElement extends Pattern {
  type: Type.RestElement
  argument: Pattern
  typeAnnotation: TypeAnnotation | null;
}

export interface AssignmentPattern extends Pattern {
  type: Type.AssignmentPattern
  left: Pattern
  right: Expression
}

export interface Class extends Node {
  type: Type.Class
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

export interface ClassDeclaration extends Class, Declaration {
  type: Type.ClassDeclaration
  id: Identifier
}

export interface ClassExpression extends Class, Expression {
  type: Type.ClassExpression
}

export interface MetaProperty extends Node {
  type: Type.MetaProperty
  meta: Identifier
  property: Identifier
}

export interface ModuleDeclaration extends Node {
}

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
  specifiers: (ExportSpecifier)[]
  source: Literal | null
}

export interface ExportSpecifier extends ModuleSpecifier {
  type: Type.ExportSpecifier
  exported: Identifier
}

export interface AnonymousDefaultExportedFunctionDeclaration extends FunctionDeclaration {
  type: Type.FunctionDeclaration
  id: null
}

export interface AnonymousDefaultExportedClassDeclaration extends ClassDeclaration {
  type: Type.ClassDeclaration
  id: null
}

export interface ExportDefaultDeclaration extends ModuleDeclaration {
  type: Type.ExportDefaultDeclaration
  declaration: AnonymousDefaultExportedFunctionDeclaration | FunctionDeclaration | AnonymousDefaultExportedClassDeclaration | ClassDeclaration | Expression
}

export interface ExportAllDeclaration extends ModuleDeclaration {
  type: Type.ExportAllDeclaration
  source: Literal
  exported: Identifier | null;
}

export interface AwaitExpression extends Expression {
  type: Type.AwaitExpression
  argument: Expression
}

export interface BigIntLiteral extends Literal {
  bigint: string;
}

export interface ChainExpression extends Expression {
  type: Type.ChainExpression
  expression: ChainElement
}

export interface ChainElement extends Node {
  type: Type.ChainElement
  optional: boolean
}

export interface ImportExpression extends Expression {
  type: Type.ImportExpression
  source: Expression
}

export interface PropertyDefinition extends Node {
  type: Type.PropertyDefinition
  key: Expression | PrivateIdentifier
  value: Expression | null
  // kind: 'init' | 'get' | 'set'
  computed: boolean
  static: boolean
}

export interface PrivateIdentifier extends Node {
  type: Type.PrivateIdentifier
  name: string
}

export interface StaticBlock extends BlockStatement {
  type: Type.StaticBlock
}

export interface TypeAnnotation extends Node {
  type: Type.TypeAnnotation
}
