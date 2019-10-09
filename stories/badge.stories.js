import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {Badge} from '@smashing/badge'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

storiesOf('Core|Badge', module)
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
      <Badge color="green" marginLeft={8}>
        Green
      </Badge>
      <Badge color="red" marginLeft={8}>
        Red
      </Badge>
      <Badge color="blue" marginLeft={8}>
        Blue
      </Badge>
      <Badge color="teal" marginLeft={8}>
        Teal
      </Badge>
    </React.Fragment>
  ))
  .add('appearance:solid', () => (
    <React.Fragment>
      <Badge color="green" marginLeft={8} appearance="solid">
        Green
      </Badge>
      <Badge color="red" marginLeft={8} appearance="solid">
        Red
      </Badge>
      <Badge color="blue" marginLeft={8} appearance="solid">
        Blue
      </Badge>
      <Badge color="teal" marginLeft={8} appearance="solid">
        Teal
      </Badge>
    </React.Fragment>
  ))
