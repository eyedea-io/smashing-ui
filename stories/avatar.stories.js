import React from "react"
import {storiesOf, addDecorator} from "@storybook/react"
import {Avatar} from "@smashing/avatar"
import {withA11y} from "@storybook/addon-a11y"
import {SmashingThemeProvider} from "@smashing/theme"

addDecorator(withA11y)

const listStyle = {
  display: "grid",
  columnGap: "8px",
  gridAutoFlow: "column",
  gridAutoColumns: "min-content"
}

storiesOf("Core|Avatar", module)
  .addDecorator(story => (
    <SmashingThemeProvider theme={{}}>{story()}</SmashingThemeProvider>
  ))
  .add("appearance:subtle:default", () => (
    <React.Fragment>
      <Avatar name="Sasha Ho" />
    </React.Fragment>
  ))
  .add("appearance:solid", () => (
    <React.Fragment>
      <Avatar name="Sasha Ho" appearance="solid" />
    </React.Fragment>
  ))
  .add("with photo", () => (
    <React.Fragment>
      <Avatar name="Sasha Ho" src="https://i.imgur.com/6EITnfO.png" />
    </React.Fragment>
  ))
  .add("color", () => (
    <div style={listStyle}>
      <Avatar name="Sasha Ho" color="blue" />
      <Avatar name="Sasha Ho" color="green" />
      <Avatar name="Sasha Ho" color="neutral" />
      <Avatar name="Sasha Ho" color="orange" />
      <Avatar name="Sasha Ho" color="purple" />
      <Avatar name="Sasha Ho" color="red" />
      <Avatar name="Sasha Ho" color="teal" />
      <Avatar name="Sasha Ho" color="yellow" />
    </div>
  ))
  .add("anonymous users", () => (
    <div style={listStyle}>
      <Avatar name="Anonymous User" hashValue="id-10" />
      <Avatar name="Anonymous User" hashValue="id-20" />
      <Avatar name="Anonymous User" hashValue="id-30" />
    </div>
  ))
