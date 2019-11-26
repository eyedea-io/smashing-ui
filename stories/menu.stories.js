import React, {useState} from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {TextInput} from '@smashing/text-input'
import {Popover} from '@smashing/popover'
import {Menu} from '@smashing/menu'
import {Button} from '@smashing/button'
import {SideSheet} from '@smashing/side-sheet'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

const Link = ({children, ...props}) => <div {...props}>{children}</div>
const State = ({defaultValue, children}) => {
  const [value, setValue] = React.useState(defaultValue)

  return children({value, setValue})
}

storiesOf('Selects & Dropdown Menus|Menu', module)
const Wrapper = ({children}) => {
  const [isShown, setIsShown] = useState(false)
  const [selected, setSelected] = useState(null)

  return (
    <div>
      {children({setIsShown, isShown, selected, setSelected})}
      <Button onClick={() => setIsShown(true)}>Show Side Sheet</Button>
    </div>
  )
}

const options = [
  {label: 'Apple', value: 'Apple'},
  {label: 'Apricot', value: 'Apricot'},
  {label: 'Banana', value: 'Banana'},
  {label: 'Cherry', value: 'Cherry', disabled: true}
]

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
            <Menu.Item
              onSelect={() => {
                console.log('selected')
              }}
              secondaryText="CTRL+Del"
              intent="danger"
            >
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
  .add('in Side Sheet', () => (
    <Wrapper>
      {({setIsShown, isShown, selected, setSelected}) => (
        <SideSheet
          isShown={isShown}
          onCloseComplete={() => setIsShown(false)}
          isClosingButtonVisible={true}
          autofocus={false}
          containerProps={{
            display: 'flex',
            flex: '1',
            flexDirection: 'column'
          }}
        >
          <Menu>
            <Menu.Group title="Basic">
              {options.map(option => (
                <Menu.Item
                  isSelected={selected === option.value ? true : false}
                  onSelect={() => setSelected(option.value)}
                  key={option.value}
                >
                  {option.label}
                </Menu.Item>
              ))}
            </Menu.Group>
          </Menu>
        </SideSheet>
      )}
    </Wrapper>
  ))
