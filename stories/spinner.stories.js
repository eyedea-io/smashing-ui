import React from "react"
import {storiesOf, addDecorator} from "@storybook/react"
import {Spinner} from "@smashing/spinner"
import {withA11y} from "@storybook/addon-a11y"
import {SmashingThemeProvider} from "@smashing/theme"
import {palette} from "../packages/theme/lib/esm/default-theme/foundational-styles"

addDecorator(withA11y)

storiesOf("Core|Spinner", module)
  .addDecorator(story => (
    <SmashingThemeProvider
      theme={{
        defaults: {
          spinner: {}
        }
      }}
    >
      {story()}
    </SmashingThemeProvider>
  ))
  .add("Default", () => (
    <React.Fragment>
      <p>
        <Spinner />
      </p>
    </React.Fragment>
  ))
  .add("Small", () => (
    <React.Fragment>
      <p>
        <Spinner size={24} />
      </p>
    </React.Fragment>
  ))
  .add("Color", () => (
    <React.Fragment>
      <p>
        <Spinner color={palette.blue.light} />
      </p>
    </React.Fragment>
  ))
  .add("Delay", () => (
    <React.Fragment>
      <p>
        <Spinner delay={2000} />
      </p>
    </React.Fragment>
  ))
