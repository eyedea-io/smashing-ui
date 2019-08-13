import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'
import {Table} from '@smashing/table'

addDecorator(withA11y)

storiesOf('Core|Table', module)
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
  .add('appearance:default', () => (
    <React.Fragment>
      <Table>
        <Table.TextCell>ssss</Table.TextCell>
      </Table>
    </React.Fragment>
  ))
