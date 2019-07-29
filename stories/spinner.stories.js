import React from "react"
import {storiesOf, addDecorator} from "@storybook/react"
import {Spinner} from "@smashing/spinner"
import {withA11y} from "@storybook/addon-a11y"
import {SmashingThemeProvider} from "@smashing/theme"

addDecorator(withA11y)

storiesOf("Core|Spinner", module)
  .addDecorator(story => (
    <SmashingThemeProvider
      theme={{
        defaults: {
          Spinner: {
            size:24
          }
        }
      }}
    >
      {story()}
    </SmashingThemeProvider>
  ))
  .add("appearance:default", () => (
    <React.Fragment>
      <p>
        <Spinner />
      </p>
    </React.Fragment>
  ))
