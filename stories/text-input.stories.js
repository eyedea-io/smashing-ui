import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {TextInput} from '@smashing/text-input'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

storiesOf('Core|TextInput', module)
  .addDecorator(story => (
    <SmashingThemeProvider
      theme={{
        defaults: {},
        fontFamilies: {
          display: 'arial'
        }
      }}
    >
      {story()}
    </SmashingThemeProvider>
  ))
  .add('appearance:default', () => (
    <React.Fragment>
      <div>
        <TextInput placeholder="Your name" />
      </div>
    </React.Fragment>
  ))
  .add('appearance:underline', () => (
    <React.Fragment>
      <div>
        <TextInput appearance="underline" placeholder="Your name" />
      </div>
    </React.Fragment>
  ))
  .add('appearance:neutral', () => (
    <React.Fragment>
      <div>
        <TextInput appearance="neutral" placeholder="Your name" />
      </div>
    </React.Fragment>
  ))
  .add('appearance:minimal', () => (
    <React.Fragment>
      <div>
        <TextInput appearance="minimal" placeholder="Your name" />
      </div>
    </React.Fragment>
  ))
  .add('appearance:outline', () => (
    <React.Fragment>
      <div>
        <TextInput appearance="outline" placeholder="Your name" />
      </div>
    </React.Fragment>
  ))
  .add('appearance:default:disabled', () => (
    <React.Fragment>
      <div>
        <TextInput placeholder="Your name" value="Your name" disabled />
      </div>
    </React.Fragment>
  ))
  .add('appearance:minimal:disabled', () => (
    <React.Fragment>
      <div>
        <TextInput
          appearance="minimal"
          placeholder="Your name"
          value="Your name"
          disabled
        />
      </div>
    </React.Fragment>
  ))
  .add('appearance:underline:disabled', () => (
    <React.Fragment>
      <div>
        <TextInput
          appearance="underline"
          placeholder="Your name"
          value="Your name"
          disabled
        />
      </div>
    </React.Fragment>
  ))
  .add('appearance:neutral:disabled', () => (
    <React.Fragment>
      <div>
        <TextInput
          appearance="neutral"
          placeholder="Your name"
          value="Your name"
          disabled
        />
      </div>
    </React.Fragment>
  ))
  .add('appearance:outline:disabled', () => (
    <React.Fragment>
      <div>
        <TextInput appearance="outline" value="Test value" disabled />
      </div>
    </React.Fragment>
  ))
  .add('appearance:outline:with suffix', () => (
    <React.Fragment>
      <div>
        <TextInput appearance="outline" suffix="km/h" />
      </div>
    </React.Fragment>
  ))
  .add('borderRadius:30', () => (
    <React.Fragment>
      <div>
        <TextInput placeholder="Your name" borderRadius={30} />
      </div>
    </React.Fragment>
  ))
  .add('height:40', () => (
    <React.Fragment>
      <div>
        <TextInput placeholder="Your name" height={40} />
      </div>
    </React.Fragment>
  ))
  .add('height:undefined', () => (
    <React.Fragment>
      <div>
        <TextInput placeholder="Your name" height={undefined} />
      </div>
    </React.Fragment>
  ))
