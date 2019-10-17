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
        defaults: {
          textInput: {}
        },
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
  .add('appearance:default:invalid', () => (
    <React.Fragment>
      <div>
        <TextInput placeholder="Your name" invalid />
      </div>
    </React.Fragment>
  ))
  .add('appearance:minimal:invalid', () => (
    <React.Fragment>
      <div>
        <TextInput placeholder="Your name" invalid appearance="minimal" />
      </div>
    </React.Fragment>
  ))
  .add('appearance:neutral:invalid', () => (
    <React.Fragment>
      <div>
        <TextInput placeholder="Your name" invalid appearance="neutral" />
      </div>
    </React.Fragment>
  ))
  .add('appearance:underline:invalid', () => (
    <React.Fragment>
      <div>
        <TextInput placeholder="Your name" invalid appearance="underline" />
      </div>
    </React.Fragment>
  ))
  .add('full', () => (
    <React.Fragment>
      <div>
        <TextInput placeholder="Your name" full />
      </div>
    </React.Fragment>
  ))
