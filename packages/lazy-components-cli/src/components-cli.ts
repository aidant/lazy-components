#!/usr/bin/env node

import { parse } from '@lazy/parser'
import { compile } from '@lazy/compiler'
import process from 'node:process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { generate } from 'escodegen'
import prettier from 'prettier'

const inputPath = path.relative(process.cwd(), process.argv[2])
const outputPath = path.relative(process.cwd(), process.argv[3])

const inputFile = await fs.readFile(inputPath, { encoding: 'utf8' })
const inputAST = parse(inputFile)
const outputAST = compile(path.basename(inputPath, '.lazy'), inputAST)
const outputFile = prettier.format(generate(outputAST), {
  parser: 'babel',
  singleQuote: true,
  semi: false,
  printWidth: 100,
})
await fs.writeFile(outputPath, outputFile, { encoding: 'utf8' })
