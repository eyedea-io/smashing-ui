import React from "react"
import {storiesOf} from "@storybook/react"
import {Head} from "@smashing/head"

storiesOf("Functional|Head", module)
  .add("add title to page head", () => (
    <Head>
      <title>About us</title>
    </Head>
  ))
  .add("add meta to page head", () => (
    <Head>
      <meta charset="utf-8" />
    </Head>
  ))
