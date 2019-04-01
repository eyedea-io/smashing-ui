import React from "react"
import {storiesOf, addDecorator} from "@storybook/react"
import {Button} from "@smashing/button/src/index"
import {withA11y} from "@storybook/addon-a11y"
import {ThemeProvider} from "styled-components"
import {theme} from "@smashing/theme"

addDecorator(withA11y)

storiesOf("Core|Button", module)
  .addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>)
  .add("appearance:default", () => (
    <React.Fragment>
      <p>
        <Button>Hulk smash!</Button>
      </p>
      <p>
        <Button intent="success">Hulk smash!</Button>
      </p>
      <p>
        <Button intent="warning">Hulk smash!</Button>
      </p>
      <p>
        <Button intent="danger">Hulk smash!</Button>
      </p>
    </React.Fragment>
  ))
  .add("appearance:primary", () => (
    <React.Fragment>
      <p>
        <Button appearance="primary">Hulk smash!</Button>
      </p>
      <p>
        <Button appearance="primary" intent="success">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button appearance="primary" intent="warning">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button appearance="primary" intent="danger">
          Hulk smash!
        </Button>
      </p>
    </React.Fragment>
  ))
  .add("appearance:minimal", () => (
    <React.Fragment>
      <p>
        <Button appearance="minimal">Hulk smash!</Button>
      </p>
      <p>
        <Button appearance="minimal" intent="success">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button appearance="minimal" intent="warning">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button appearance="minimal" intent="danger">
          Hulk smash!
        </Button>
      </p>
    </React.Fragment>
  ))
  .add("appearance:flat", () => (
    <React.Fragment>
      <p>
        <Button appearance="flat">Hulk smash!</Button>
      </p>
      <p>
        <Button appearance="flat" intent="success">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button appearance="flat" intent="warning">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button appearance="flat" intent="danger">
          Hulk smash!
        </Button>
      </p>
    </React.Fragment>
  ))
  .add("height", () => (
    <React.Fragment>
      <p>
        <Button height="24">Hulk smash!</Button>
      </p>
      <p>
        <Button height="32">Hulk smash!</Button>
      </p>
      <p>
        <Button height="40">Hulk smash!</Button>
      </p>
      <p>
        <Button height="48">Hulk smash!</Button>
      </p>
    </React.Fragment>
  ))
