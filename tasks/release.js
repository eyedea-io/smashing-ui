#!/usr/bin/env node

const {writeFileSync} = require("fs")
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

const withoutMeta = item =>
  !(item === "" || /yarn exec/.test(item) || /Done in/.test(item))

const changelog = result
  .split("\n")
  .filter(withoutMeta)
  .join("\n")

if (changelog !== "") {
  console.log()
  console.log("Update changelog before releasing new version.")
  console.log()
  process.exit(1)
}

spawn.sync("yarn", ["exec", "lerna", "publish"], {
  stdio: "inherit"
})
