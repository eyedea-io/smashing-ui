import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {Textarea} from '@smashing/textarea'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

storiesOf('Core|Textarea', module)
  .addDecorator(story => (
    <SmashingThemeProvider theme={{}}>{story()}</SmashingThemeProvider>
  ))
  .add('appearance:default', () => (
    <React.Fragment>
      <Textarea name="textarea-1" placeholder="Textarea placeholder..." />
    </React.Fragment>
  ))
  .add('appearance:disabled', () => (
    <React.Fragment>
      <Textarea placeholder="Textarea placeholder..." disabled />
    </React.Fragment>
  ))
