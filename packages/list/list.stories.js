import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {List} from '@smashing/list'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

const styleRed = {
  background: 'red',
  height: '500px',
  padding: '10px'
}

const styleBlue = {
  background: 'blue',
  height: '1000px',
  padding: '10px'
}

storiesOf('Core|List', module)
  .addDecorator(story => (
    <SmashingThemeProvider theme={{}}>{story()}</SmashingThemeProvider>
  ))
  .add('default', () => <List>
    <div style={styleRed}>Element</div>
    <div style={styleBlue}>Element2</div>
    <div style={styleRed}>Element3</div>
    <div style={styleBlue}>Element4</div>
    <div style={styleRed}>Element5</div>
  </List>)
