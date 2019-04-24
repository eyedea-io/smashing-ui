import React from "react"
import {storiesOf, addDecorator} from "@storybook/react"
import {Text} from "@smashing/typography"
import {TextInput} from "@smashing/text-input"
import {Popover} from "@smashing/popover"
import {Menu} from "@smashing/menu"
import {Button} from "@smashing/button"
import {withA11y} from "@storybook/addon-a11y"
import {SmashingThemeProvider} from "@smashing/theme"

addDecorator(withA11y)

const Link = ({children, ...props}) => <div {...props}>{children}</div>

storiesOf("Core|Menu", module)
  .addDecorator(story => (
    <SmashingThemeProvider theme={{}}>{story()}</SmashingThemeProvider>
  ))
  .add("appearance:default", () => (
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
  .add("with group titles", () => (
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
  .add("with secondary text", () => (
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
  .add("in dropdown", () => (
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
  .add("custom trigger", () => (
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
