import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'
import {Table} from '@smashing/table'

addDecorator(withA11y)

const table = [
  {name: 'xyz'},
  {name: 'xyz'},
  {name: 'xyz'},
  {name: 'xyz'},
  {name: 'xyz'},
  {name: 'xyz'},
  {name: 'xyz'},
  {name: 'xyz'},
  {name: 'xyz'},
  {name: 'xyz'},
  {name: 'xyz'},
  {name: 'xyz'},
  {name: 'xyz'},
  {name: 'xyz'}
]

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
    <div style={{width: '500px', height: '200px'}}>
      <Table>
        <Table.Head>
          <Table.SearchHeaderCell
            placeholder="Filter..."
            icon="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vector_search_icon.svg/945px-Vector_search_icon.svg.png"
          />
          <Table.TextHeaderCell>Email</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {table.map((item, index) => (
            <Table.Row isSelectable={false}>
              <Table.TextCell flexBasis={560} flexShrink={0} flexGrow={0}>
                {index}
              </Table.TextCell>
              <Table.TextCell>{item.name}.example@com</Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  ))
