import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {Text} from '@smashing/typography'
import {Popover} from '@smashing/popover'
import {Button} from '@smashing/button'
import {Avatar} from '@smashing/avatar'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

storiesOf('Core|Popover', module)
  .addDecorator(story => (
    <SmashingThemeProvider theme={{}}>{story()}</SmashingThemeProvider>
  ))
  .add('appearance:default', () => (
    <Popover
      position="right"
      minWidth={120}
      content={
        <div>
          <Text>PopoverContent</Text>
        </div>
      }
    >
      <Button>Trigger Popover</Button>
    </Popover>
  ))
  .add('avatar trigger', () => (
    <Popover
      position="right"
      content={
        <div>
          <Text>PopoverContent</Text>
        </div>
      }
    >
      <Avatar name="John Doe" />
    </Popover>
  ))
