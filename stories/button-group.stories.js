import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {ButtonGroup} from '@smashing/button-group'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

const options = [
  {
    label: 'Lorem Ipsum',
    value: 1
  },
  {
    label: 'is simply dummy',
    value: 2
  },
  {
    label: 'text of the printing',
    value: 3
  },
  {
    label: 'and typesetting industry',
    value: 4
  }
]
addDecorator(withA11y)

storiesOf('Atomic Elements|Buttons Group', module)
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
  .add('default', () => {
    const [value, setValue] = React.useState(1)

    return (
      <React.Fragment>
        <p>Default</p>
        <ButtonGroup
          onChange={v => setValue(v)}
          value={value}
          options={options.slice(0, 2)}
        />
        <p>Flat</p>
        <ButtonGroup
          appearance="flat"
          onChange={v => setValue(v)}
          value={value}
          options={options.slice(0, 3)}
        />
        <p>Primary</p>
        <ButtonGroup
          appearance="primary"
          onChange={v => setValue(v)}
          value={value}
          options={options}
        />
        <p>Minimal</p>
        <ButtonGroup
          appearance="minimal"
          onChange={v => setValue(v)}
          value={value}
          options={options}
        />
        <p>Subtle</p>
        <ButtonGroup
          appearance="subtle"
          onChange={v => setValue(v)}
          value={value}
          options={options}
        />
      </React.Fragment>
    )
  })
  .add('full width', () => {
    const [value, setValue] = React.useState(1)

    return (
      <React.Fragment>
        <p>Default</p>
        <ButtonGroup
          full
          onChange={v => setValue(v)}
          value={value}
          options={options.slice(0, 2)}
        />
        <p>Flat</p>
        <ButtonGroup
          appearance="flat"
          full
          onChange={v => setValue(v)}
          value={value}
          options={options.slice(0, 3)}
        />
        <p>Primary</p>
        <ButtonGroup
          appearance="primary"
          full
          onChange={v => setValue(v)}
          value={value}
          options={options}
        />
        <p>Minimal</p>
        <ButtonGroup
          appearance="minimal"
          full
          onChange={v => setValue(v)}
          value={value}
          options={options}
        />
        <p>Subtle</p>
        <ButtonGroup
          appearance="subtle"
          full
          onChange={v => setValue(v)}
          value={value}
          options={options}
        />
      </React.Fragment>
    )
  })
