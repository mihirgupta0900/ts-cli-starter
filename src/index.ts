#!/usr/bin/env node

import { Command } from "@commander-js/extra-typings"
import { input } from "@inquirer/prompts"
import chalk from "chalk"
import Conf from "conf"

import packageJson from "../package.json"

type ConfigProps = {
  message: string
}

export type Config = Conf<ConfigProps>

const program = new Command()
const config = new Conf<ConfigProps>({
  projectName: "ts-cli-starter",
})

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version)

program
  .command("hello")
  .option("-m, --message <msg>")
  .action(async (options) => {
    const name = await input({
      message: "What's your name?",
    })

    let message = ""

    if (options.message) {
      message = options.message
    } else {
      message = config.get("message") || "Hello, world!"
    }

    config.set("message", message)

    console.log(chalk.blue(`Hey ${name}, here is your message: ${message}`))
  })

program.parse()
