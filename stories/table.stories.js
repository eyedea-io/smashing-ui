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
        <Table.Body>
          <Table.Head>
            <Table.TextHeaderCell>Age</Table.TextHeaderCell>
            <Table.TextHeaderCell>Email</Table.TextHeaderCell>
          </Table.Head>
          <Table.Row isSelectable={false}>
            <Table.TextCell flexBasis={560} flexShrink={0} flexGrow={0}>
              24
            </Table.TextCell>
            <Table.TextCell>jon.example@com</Table.TextCell>
          </Table.Row>
        </Table.Body>
      </Table>
    </React.Fragment>
  ))
