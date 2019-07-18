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
  .add("appearance:primary default", () => (
    <React.Fragment>
      <p>
        <Checkbox label="sign" />
      </p>
    </React.Fragment>
  ))
  .add("appearance:primary checked", () => (
    <React.Fragment>
      <p>
        <Checkbox checked label="sign" />
      </p>
    </React.Fragment>
  ))
  .add("disabled", () => (
    <React.Fragment>
      <p>
        <Checkbox disabled label="sign" />
      </p>
    </React.Fragment>
  ))
  .add("checked disabled", () => (
    <React.Fragment>
      <p>
        <Checkbox checked disabled label="sign" />
      </p>
    </React.Fragment>
  ))
  .add("appearance:minimal default", () => (
    <React.Fragment>
      <p>
        <Checkbox appearance="minimal" label="sign" />
      </p>
    </React.Fragment>
  ))
  .add("appearance:minimal checked", () => (
    <React.Fragment>
      <p>
        <Checkbox appearance="minimal" checked label="sign" />
      </p>
    </React.Fragment>
  ))
