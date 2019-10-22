import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {Textarea} from '@smashing/textarea'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

storiesOf('Core|Textarea', module)
  .addDecorator(story => (
    <SmashingThemeProvider
      theme={{
        defaults: {}
      }}
    >
      {story()}
    </SmashingThemeProvider>
  ))
  .add('appearance:default', () => (
    <React.Fragment>
      <Textarea placeholder="Textarea placeholder..." />
    </React.Fragment>
  ))
  .add('appearance:minimal', () => (
    <React.Fragment>
      <Textarea placeholder="Textarea placeholder..." appearance="minimal" />
    </React.Fragment>
  ))
  .add('appearance:underline', () => (
    <React.Fragment>
      <Textarea placeholder="Textarea placeholder..." appearance="underline" />
    </React.Fragment>
  ))
  .add('appearance:neutral', () => (
    <React.Fragment>
      <Textarea placeholder="Textarea placeholder..." appearance="neutral" />
    </React.Fragment>
  ))
  .add('disabled', () => (
    <React.Fragment>
      <Textarea placeholder="Textarea placeholder..." disabled />
    </React.Fragment>
  ))
  .add('invalid', () => (
    <React.Fragment>
      <Textarea placeholder="Textarea placeholder..." invalid />
    </React.Fragment>
  ))
  .add('allow grammarly', () => (
    <React.Fragment>
      <Textarea placeholder="Textarea placeholder..." grammarly />
    </React.Fragment>
  ))
  .add('variant:300', () => (
    <React.Fragment>
      <Textarea placeholder="Textarea placeholder..." variant={300} />
    </React.Fragment>
  ))
  .add('variant:400', () => (
    <React.Fragment>
      <Textarea placeholder="Textarea placeholder..." variant={400} />
    </React.Fragment>
  ))
  .add('variant:500', () => (
    <React.Fragment>
      <Textarea placeholder="Textarea placeholder..." variant={500} />
    </React.Fragment>
  ))
  .add('full', () => (
    <React.Fragment>
      <Textarea placeholder="Textarea placeholder..." full />
    </React.Fragment>
  ))
