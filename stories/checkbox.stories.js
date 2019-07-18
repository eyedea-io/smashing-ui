import React from "react"
import {storiesOf, addDecorator} from "@storybook/react"
import {Checkbox} from "@smashing/checkbox"
import {withA11y} from "@storybook/addon-a11y"
import {SmashingThemeProvider} from "@smashing/theme"

addDecorator(withA11y)

storiesOf("Core|Checkbox", module)
  .addDecorator(story => (
    <SmashingThemeProvider
      theme={{
        defaults: {
          label: "Stay signed in"
        }
      }}
    >
      {story()}
    </SmashingThemeProvider>
  ))
  .add("appearance:primary", () => (
    <React.Fragment>
      <p>
        <Checkbox checked disabled label="sign" />
      </p>
    </React.Fragment>
  ))
