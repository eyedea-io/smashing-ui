import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {LabelWrapper} from '@smashing/label-wrapper'
import {withA11y} from '@storybook/addon-a11y'
// import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

storiesOf('Core|LabelWrapper', module).add('label', () => (
  <LabelWrapper>
    <span>Here</span>
    <span>Here</span>
  </LabelWrapper>
))
