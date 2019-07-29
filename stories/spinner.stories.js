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
          }
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
        <Spinner size={24}/>
      </p>
    </React.Fragment>
  ))
  .add("Color", () => (
    <React.Fragment>
      <p>
        <Spinner color="royalblue"/>
      </p>
    </React.Fragment>
  ))