import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {TextInput} from '@smashing/text-input'
import {Popover} from '@smashing/popover'
import {Menu} from '@smashing/menu'
import {Button} from '@smashing/button'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

const Link = ({children, ...props}) => <div {...props}>{children}</div>
const State = ({defaultValue, children}) => {
  const [value, setValue] = React.useState(defaultValue)

  return children({value, setValue})
}

storiesOf('Core|Menu', module)
  .addDecorator(story => (
    <SmashingThemeProvider theme={{}}>{story()}</SmashingThemeProvider>
  ))
  .add('appearance:default', () => (
    <Menu>
      <Menu.Group>
        <Menu.Item as={Link}>Edit</Menu.Item>
        <Menu.Item>Rename</Menu.Item>
      </Menu.Group>
      <Menu.Divider />
      <Menu.Group>
        <Menu.Item intent="danger">Delete</Menu.Item>
      </Menu.Group>
    </Menu>
  ))
  .add('empty', () => <Menu />)
  .add('with group titles', () => (
    <Menu>
      <Menu.Group title="Basic">
        <Menu.Item>Edit</Menu.Item>
        <Menu.Item>Rename</Menu.Item>
      </Menu.Group>
      <Menu.Divider />
      <Menu.Group title="Other">
        <Menu.Item intent="danger">Delete</Menu.Item>
      </Menu.Group>
    </Menu>
  ))
  .add('options group', () => (
    <Menu>
      <State defaultValue="asc">
        {({value, setValue}) => (
          <Menu.OptionsGroup
            title="Sort"
            value={value}
            onChange={selected => {
              setValue(selected)
            }}
            options={[
              {label: 'Ascending', value: 'asc'},
              {label: 'Descending', value: 'desc'}
            ]}
          />
        )}
      </State>
      <State defaultValue={['id', 'name']}>
        {({value, setValue}) => (
          <Menu.OptionsGroup
            title="Visible columns"
            value={value}
            isMultiSelect
            onChange={selected => {
              setValue(selected)
            }}
            options={[
              {label: 'ID', value: 'id'},
              {label: 'Name', value: 'name', disabled: true},
              {label: 'Created at', value: 'created_at'},
              {label: 'Updated at', value: 'updated_at'}
            ]}
          />
        )}
      </State>
    </Menu>
  ))
  .add('with secondary text', () => (
    <Menu>
      <Menu.Group title="Basic">
        <Menu.Item>Edit</Menu.Item>
        <Menu.Item secondaryText="F2">Rename</Menu.Item>
      </Menu.Group>
      <Menu.Divider />
      <Menu.Group title="Other">
        <Menu.Item secondaryText="CTRL+Del" intent="danger">
          Delete
        </Menu.Item>
      </Menu.Group>
    </Menu>
  ))
  .add('in dropdown', () => (
    <Popover
      content={
        <Menu>
          <Menu.Group title="Basic">
            <Menu.Item>Edit</Menu.Item>
            <Menu.Item secondaryText="F2">Rename</Menu.Item>
          </Menu.Group>
          <Menu.Divider />
          <Menu.Group title="Other">
            <Menu.Item secondaryText="CTRL+Del" intent="danger">
              Delete
            </Menu.Item>
          </Menu.Group>
        </Menu>
      }
    >
      <Button>Open menu</Button>
    </Popover>
  ))
  .add('custom trigger', () => (
    <Popover
      content={
        <Menu>
          <Menu.Group title="Basic">
            <Menu.Item>Edit</Menu.Item>
            <Menu.Item secondaryText="F2">Rename</Menu.Item>
          </Menu.Group>
          <Menu.Divider />
          <Menu.Group title="Other">
            <Menu.Item secondaryText="CTRL+Del" intent="danger">
              Delete
            </Menu.Item>
          </Menu.Group>
        </Menu>
      }
    >
      {({getRef, toggle}) => (
        <TextInput onClick={toggle} ref={getRef}>
          Open menu
        </TextInput>
      )}
    </Popover>
  ))
