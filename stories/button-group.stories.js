import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {ButtonGroup} from '@smashing/button-group'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'
import {CalendarRegular} from './common/icon'

const options = [
  {
    label: 'Lorem Ipsum',
    value: 1,
    iconBefore: CalendarRegular
  },
  {
    label: 'is simply dummy',
    value: 2,
    iconAfter: CalendarRegular
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
  .add('layout: default', () => {
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
          textAlign="right"
          onChange={v => setValue(v)}
          value={value}
          options={options.slice(0, 3)}
        />
        <p>Minimal</p>
        <ButtonGroup
          appearance="minimal"
          onChange={v => setValue(v)}
          value={value}
          options={options.slice(0, 3)}
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
  .add('layout: equal width', () => {
    const [value, setValue] = React.useState(1)

    return (
      <React.Fragment>
        <p>Default</p>
        <ButtonGroup
          layout="equal"
          onChange={v => setValue(v)}
          value={value}
          options={options.slice(0, 2)}
        />
        <p>Flat</p>
        <ButtonGroup
          appearance="flat"
          layout="equal"
          onChange={v => setValue(v)}
          value={value}
          options={options.slice(0, 3)}
        />
        <p>Primary</p>
        <ButtonGroup
          appearance="primary"
          textAlign="right"
          layout="equal"
          onChange={v => setValue(v)}
          value={value}
          options={options.slice(0, 3)}
        />
        <p>Minimal</p>
        <ButtonGroup
          appearance="minimal"
          textAlign="center"
          layout="equal"
          onChange={v => setValue(v)}
          value={value}
          options={options.slice(0, 3)}
        />
        <p>Subtle</p>
        <ButtonGroup
          appearance="subtle"
          textAlign="center"
          layout="equal"
          onChange={v => setValue(v)}
          value={value}
          options={options}
        />
      </React.Fragment>
    )
  })
  .add('layout: full width', () => {
    const [value, setValue] = React.useState(1)

    return (
      <React.Fragment>
        <p>Default</p>
        <ButtonGroup
          layout="full"
          onChange={v => setValue(v)}
          value={value}
          options={options.slice(0, 2)}
        />
        <p>Flat</p>
        <ButtonGroup
          appearance="flat"
          layout="full"
          onChange={v => setValue(v)}
          value={value}
          options={options.slice(0, 3)}
        />
        <p>Primary</p>
        <ButtonGroup
          appearance="primary"
          textAlign="right"
          layout="full"
          onChange={v => setValue(v)}
          value={value}
          options={options.slice(0, 3)}
        />
        <p>Minimal</p>
        <ButtonGroup
          appearance="minimal"
          textAlign="center"
          layout="full"
          onChange={v => setValue(v)}
          value={value}
          options={options.slice(0, 3)}
        />
        <p>Subtle</p>
        <ButtonGroup
          appearance="subtle"
          textAlign="center"
          layout="full"
          onChange={v => setValue(v)}
          value={value}
          options={options}
        />
      </React.Fragment>
    )
  })
