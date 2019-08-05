import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {List} from '@smashing/list'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

storiesOf('Core|List', module)
  .addDecorator(story => (
    <SmashingThemeProvider theme={{}}>{story()}</SmashingThemeProvider>
  ))
  .add('default', () => <List>
    <div>Element</div>
    <div>Element</div>
    <div>Element</div>
    <div>Element</div>
    <div>Element</div>
    <div>Element</div>
    <div>Element</div>
    <div>Element</div>
    <div>Element</div>
    <div>Element</div>
    <div>Element</div>
    <div>Element</div>
    <div>Element</div>
    <div>Element</div>
    <div>Element</div>
    <div>Element</div>
    <div>Element</div>
    <div>Element</div>
    <div>Element</div>
    <div>Element</div>
    <div>Element</div>
    <div>Element</div>
    <div>Element</div>
    <div>Element</div>
    <div>Element</div>
  </List>)
