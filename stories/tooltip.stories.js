import React from "react"
import {storiesOf, addDecorator} from "@storybook/react"
import {Button} from "@smashing/button"
import {Text, Paragraph} from "@smashing/typography"
import {Tooltip} from "@smashing/tooltip"
import {withA11y} from "@storybook/addon-a11y"
import {SmashingThemeProvider} from "@smashing/theme"

addDecorator(withA11y)

storiesOf("Core|Tooltip", module)
  .addDecorator(story => (
    <SmashingThemeProvider theme={{}}>{story()}</SmashingThemeProvider>
  ))
  .add("appearance:default", () => (
    <Tooltip content="Edit title">
      <Button>Hello</Button>
    </Tooltip>
  ))
  .add("appearance:card", () => (
    <Tooltip
      content={
        <div style={{margin: 30}}>
          <Paragraph>Card appearance</Paragraph>
        </div>
      }
      appearance="card"
    >
      <Button>Hello</Button>
    </Tooltip>
  ))
  .add("position:right", () => (
    <Tooltip position="right" content="Hello world">
      <Button>Hello</Button>
    </Tooltip>
  ))
