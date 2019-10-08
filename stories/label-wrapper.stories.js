import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {LabelWrapper} from '@smashing/label-wrapper'
import {TextInput} from '@smashing/text-input'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

storiesOf('Core|LabelWrapper', module)
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
  .add('label', () => (
    <LabelWrapper labelTitle="Name" errorTitle="">
      <TextInput placeholder="Your name" />
    </LabelWrapper>
  ))
