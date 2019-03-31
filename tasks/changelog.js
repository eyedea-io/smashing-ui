#!/usr/bin/env node

const {writeFileSync, readFileSync} = require("fs")
const {resolve} = require("path")
const spawn = require("cross-spawn")
const result = spawn.sync("yarn", ["exec", "lerna-changelog"], {
  cwd: process.cwd(),
  env: process.env,
  stdio: "pipe",
  encoding: "utf-8"
}).stdout

if (/Must provide GITHUB_AUTH/.test(result)) {
  console.log()
  console.log("GITHUB_AUTH env variable is missing.")
  console.log("Go to https://github.com/settings/tokens and generate one.")
  console.log(
    "Duplicate .envrc.example as .envrc and paste your token there and run `source .envrc`"
  )
  console.log()
  process.exit(1)
}

const changelog = result.toString().trimLeft()

if (changelog === "") {
  console.log()
  console.log("Changelog was not generated. No changes to add.")
  console.log()
  process.exit(0)
}

const changeogPath = resolve(process.cwd(), "changelog.md")
let currentChangelog = ""

try {
  currentChangelog = readFileSync(changeogPath, {
    encoding: "utf-8"
  })
} catch (err) {}

if (changelog) {
  currentChangelog = `${changelog}\n${currentChangelog}`
}

writeFileSync(changeogPath, currentChangelog)

console.log()
console.log("Changelog was generated.")
console.log()
process.exit(0)
