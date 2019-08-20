import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {toaster} from '@smashing/toaster'
import {Button} from '@smashing/button'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

const description = 'Hello World!!'

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
      <Button onClick={() => toaster.success('Successful alert!')}>
        Success
      </Button>
      <Button onClick={() => toaster.notify('Notify alert!')}>Notify</Button>
      <Button onClick={() => toaster.warning('Warning alert!')}>Warning</Button>
      <Button onClick={() => toaster.danger('Danger alert!')}>Danger</Button>
      <Button onClick={toaster.closeAll}>Close all</Button>
    </React.Fragment>
  ))
  .add('with description', () => (
    <React.Fragment>
      <Button
        onClick={() => toaster.success('Successful alert!', {description})}
      >
        Success
      </Button>
      <Button onClick={() => toaster.notify('Notify alert!', {description})}>
        Notify
      </Button>
      <Button onClick={() => toaster.warning('Warning alert!', {description})}>
        Warning
      </Button>
      <Button onClick={() => toaster.danger('Danger alert!', {description})}>
        Danger
      </Button>
      <Button onClick={toaster.closeAll}>Close all</Button>
    </React.Fragment>
  ))
  .add('with custom duration', () => (
    <React.Fragment>
      <Button
        onClick={() => toaster.success('Successful alert!', {duration: 5})}
      >
        Success 5s
      </Button>
      <Button onClick={() => toaster.notify('Notify alert!', {duration: 10})}>
        Notify 10s
      </Button>
      <Button onClick={() => toaster.warning('Warning alert!', {duration: 15})}>
        Warning 15s
      </Button>
      <Button onClick={() => toaster.danger('Danger alert!', {duration: 20})}>
        Danger 20s
      </Button>
      <Button onClick={toaster.closeAll}>Close all</Button>
    </React.Fragment>
  ))
  .add('unique toast', () => (
    <React.Fragment>
      <Button onClick={() => toaster.success('Successful alert!', {id: 'a'})}>
        Success
      </Button>
    </React.Fragment>
  ))
