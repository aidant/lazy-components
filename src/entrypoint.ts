import { promises as fs } from 'fs'
import { parser } from './parser/parser.js'

export const compiler = () => {}

const ast = await parser(`export let hello = 'hello'
export let world = 'world'

<button is="hello-world">
  {hello} {world}!
</button>`) //?

await fs.writeFile('./ast.json', JSON.stringify(ast, null, 2))
