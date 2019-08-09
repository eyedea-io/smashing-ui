import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import toaster from '@smashing/toaster'
import {Button} from '@smashing/button'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

storiesOf('Core|Toaster', module)
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
      <Button
        onClick={() =>
          toaster.success('Evergreen is a open-source design system')
        }
      >
        Click Me!!!
      </Button>
    </React.Fragment>
  ))
