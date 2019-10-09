import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {Pill} from '@smashing/badge'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

storiesOf('Core|Pill', module)
  .addDecorator(story => (
    <SmashingThemeProvider
      theme={{
        defaults: {
          alert: {
            hasTrim: true,
            hasIcon: true
          }
        }
      }}
    >
      {story()}
    </SmashingThemeProvider>
  ))
  .add('appearance:default', () => (
    <React.Fragment>
      <Pill color="red" marginLeft={8}>
        24
      </Pill>
      <Pill marginLeft={8}>0</Pill>
    </React.Fragment>
  ))
  .add('appearance:solid', () => (
    <React.Fragment>
      <Pill color="green" marginLeft={8} appearance="solid">
        44
      </Pill>
      <Pill color="red" marginLeft={8} appearance="solid">
        24
      </Pill>
      <Pill marginLeft={8} appearance="solid">
        0
      </Pill>
    </React.Fragment>
  ))
