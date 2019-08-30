import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {SelectMenu} from '@smashing/select-menu'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

storiesOf('Core|Select menu', module)
  .addDecorator(story => (
    <SmashingThemeProvider
      theme={{
        defaults: {
          button: {}
        }
      }}
    >
      {story()}
    </SmashingThemeProvider>
  ))
  .add('Select menu', () => (
    <div style={{height: 700}}>
      <SelectMenu />
      <hr />
      <SelectMenu
        dataSource={[1, 3, 5]}
        children={props => (
          <span ref={props.getRef} onClick={props.toggle}>
            {JSON.stringify(props.selectedItems)}
          </span>
        )}
      />
    </div>
  ))
