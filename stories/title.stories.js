import React from "react"
import {storiesOf} from "@storybook/react"
import {Title} from "@smashing/title/src/index"

storiesOf("Functional|Title", module).add("set page title", () => (
  <Title>Hello</Title>
))
