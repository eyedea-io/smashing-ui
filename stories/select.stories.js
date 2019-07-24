import React from "react"
import {storiesOf, addDecorator} from "@storybook/react"
import {Select} from "@smashing/select"
import {withA11y} from "@storybook/addon-a11y"
import {SmashingThemeProvider} from "@smashing/theme"

addDecorator(withA11y)

const options = ["a", "b", "c", "d"]
const optionsWithLabels = [
  {value: "a", label: "A"},
  {value: "b", label: "B"},
  {value: "c", label: "C"},
  {value: "d", label: "D"}
]

storiesOf("Core|Select", module)
  .addDecorator(story => (
    <SmashingThemeProvider theme={{}}>{story()}</SmashingThemeProvider>
  ))
  .add("select:default", () => (
    <React.Fragment>
      <Select options={optionsWithLabels} defaultValue="a" />
      {/* <Select options={options} defaultValue="b" /> */}
    </React.Fragment>
  ))
