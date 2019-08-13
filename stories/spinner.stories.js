import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {Spinner} from '@smashing/spinner'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'
import {palette} from '../packages/theme/lib/esm/default-theme/foundational-styles'

addDecorator(withA11y)

storiesOf('Core|Spinner', module)
  .addDecorator(story => (
    <SmashingThemeProvider>{story()}</SmashingThemeProvider>
  ))
  .add('default', () => <Spinner />)
  .add('size:24', () => <Spinner size={24} />)
  .add('color:orange', () => <Spinner color={palette.orange.base} />)
  .add('delay:2000', () => <Spinner delay={2000} />)
