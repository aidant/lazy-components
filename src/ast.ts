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
}

export interface Literal extends Expression {
  type: Type.Literal
  value: string | boolean | null | number | RegExp
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
  body: Statement[]
}

export interface Function extends Node {
  type: Type.Function
  id: Identifier | null
  params: Pattern[]
  body: FunctionBody
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
  param: Pattern
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
  kind: 'var' // | 'let' | 'const'
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
  elements: (Expression | null)[]
}

export interface ObjectExpression extends Expression {
  type: Type.ObjectExpression
  properties: Property[]
}

export interface Property extends Node {
  type: Type.Property
  key: Literal | Identifier
  value: Expression
  kind: 'init' | 'get' | 'set'
  // computed: boolean
  // method: boolean
  // shorthand: boolean
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
  left: Expression
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
}

export interface AssignmentExpression extends Expression {
  type: Type.AssignmentExpression
  operator: AssignmentOperator
  left: Pattern | Expression
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
}

export interface MemberExpression extends Expression {
  type: Type.MemberExpression
  object: Expression
  property: Expression
  computed: boolean
}

export interface ConditionalExpression extends Expression {
  type: Type.ConditionalExpression
  test: Expression
  consequent: Expression
  alternate: Expression
}

export interface CallExpression extends Expression {
  type: Type.CallExpression
  callee: Expression // | Super
  arguments: Expression[] //(Expression | SpreadElement)[]
}

export interface NewExpression extends Expression {
  type: Type.NewExpression
  callee: Expression
  arguments: Expression[]
}

export interface SequenceExpression extends Expression {
  type: Type.SequenceExpression
  expressions: Expression[]
}

export interface Pattern extends Node {
  type: Type.Pattern
}