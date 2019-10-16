import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {Text, Heading} from '@smashing/typography'
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
  .add('With the overlay background', () => (
    <>
      <p>
        <Popover
          position="bottom"
          minWidth={120}
          overlay
          elevate
          content={
            <div>
              <Heading>Title</Heading>
              <Text>PopoverContent lorem ipsum lorem ipsum</Text>
            </div>
          }
        >
          <Button appearance="primary" intent="success">
            Trigger Popover (elevate button)
          </Button>
        </Popover>
      </p>

      <p>
        <Popover
          position="bottom"
          minWidth={120}
          overlay
          content={
            <div>
              <Heading>Title</Heading>
              <Text>PopoverContent lorem ipsum lorem ipsum</Text>
            </div>
          }
        >
          <Button appearance="primary" intent="success">
            Trigger Popover (do not elevate button)
          </Button>
        </Popover>
      </p>
    </>
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
