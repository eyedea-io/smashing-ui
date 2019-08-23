const replace = require('replace')

replace({
  regex: '"target":\\s+"(.+?)"',
  replacement: '"target": "es5"',
  paths: ['packages/tsconfig.build.json'],
  recursive: false,
  silent: true
})

replace({
  regex: '"module":\\s+"(.+?)"',
  replacement: '"module": "commonjs"',
  paths: ['packages/tsconfig.build.json'],
  recursive: false,
  silent: true
})

replace({
  regex: '"outDir":\\s+"(.+?)"',
  replacement: '"outDir": "lib/cjs"',
  paths: ['packages'],
  include: 'tsconfig.json',
  recursive: true,
  silent: true
})
