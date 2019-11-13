import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {Spinner} from '@smashing/spinner'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider, theme} from '@smashing/theme'

addDecorator(withA11y)

storiesOf('Feedback Indicators|Spinner', module)
  .addDecorator(story => (
    <SmashingThemeProvider>{story()}</SmashingThemeProvider>
  ))
  .add('default', () => <Spinner />)
  .add('size:24', () => <Spinner size={24} />)
  .add('color:orange', () => <Spinner color={theme.palette.orange.base} />)
  .add('delay:2000', () => <Spinner delay={2000} />)
