import * as React from "react"
import {storiesOf, addDecorator} from "@storybook/react"
import {withA11y} from "@storybook/addon-a11y"
import {Autocomplete} from '@smashing/autocomplete'
import {TextInput} from '@smashing/text-input'
import {SmashingThemeProvider} from "@smashing/theme"

addDecorator(withA11y)

const handleChange = selectedItem => {
  console.log(selectedItem)
}



storiesOf("Core|Autocomplete", module)
  .addDecorator(story => (
    <SmashingThemeProvider theme={{}}>{story()}</SmashingThemeProvider>
  ))
  .add("default", () => (
    <Autocomplete
        onChange={handleChange}
      >
        {({ getInputProps, getRef, inputValue }) => (
          <TextInput
            placeholder="Starwars names"
            value={inputValue}
            innerRef={ref => getRef(ref)}
            {...getInputProps({
            })}
          />
        )}
      </Autocomplete>
  ))