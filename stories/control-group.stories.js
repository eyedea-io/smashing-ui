import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {ControlGroup} from '@smashing/control-group'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'
import {CalendarRegular} from './common/icon'
import {Heading} from '@smashing/typography'

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

storiesOf('Form|Control Group', module)
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

    const props = {
      onChange: setValue,
      value,
      options: options.slice(0, 3)
    }

    return (
      <React.Fragment>
        <Heading variant={100}>Default</Heading>
        <ControlGroup {...props} />
        <Heading variant={100}>Flat</Heading>
        <ControlGroup
          appearance="flat"
          {...props}
        />
        <Heading variant={100}>Primary</Heading>
        <ControlGroup
          appearance="primary"
          textAlign="right"
          {...props}
        />
        <Heading variant={100}>Minimal</Heading>
        <ControlGroup
          appearance="minimal"
          {...props}
        />
        <Heading variant={100}>Subtle</Heading>
        <ControlGroup
          appearance="subtle"
          {...props}
          options={options}
        />
      </React.Fragment>
    )
  })
  .add('layout: equal width', () => {
    const [value, setValue] = React.useState(1)

    const props = {
      onChange: setValue,
      value,
      options: options.slice(0, 3)
    }

    return (
      <React.Fragment>
        <Heading variant={100}>Default</Heading>
        <ControlGroup
          layout="equal"
          {...props}
          options={options.slice(0, 2)}
        />
        <Heading variant={100}>Flat</Heading>
        <ControlGroup
          appearance="flat"
          layout="equal"
          {...props}
        />
        <Heading variant={100}>Primary</Heading>
        <ControlGroup
          appearance="primary"
          textAlign="right"
          layout="equal"
          {...props}
        />
        <Heading variant={100}>Minimal</Heading>
        <ControlGroup
          appearance="minimal"
          textAlign="center"
          layout="equal"
          {...props}
        />
        <Heading variant={100}>Subtle</Heading>
        <ControlGroup
          appearance="subtle"
          textAlign="center"
          layout="equal"
          {...props}
        />
      </React.Fragment>
    )
  })
  .add('layout: full width', () => {
    const [value, setValue] = React.useState(1)

    const props = {
      onChange: setValue,
      value,
      options: options.slice(0, 3)
    }

    return (
      <React.Fragment>
        <Heading variant={100}>Default</Heading>
        <ControlGroup
          layout="full"
          {...props}
          options={options.slice(0, 2)}
        />
        <Heading variant={100}>Flat</Heading>
        <ControlGroup
          appearance="flat"
          layout="full"
          {...props}
        />
        <Heading variant={100}>Primary</Heading>
        <ControlGroup
          appearance="primary"
          textAlign="right"
          layout="full"
          {...props}
        />
        <Heading variant={100}>Minimal</Heading>
        <ControlGroup
          appearance="minimal"
          textAlign="center"
          layout="full"
          {...props}
        />
        <Heading variant={100}>Subtle</Heading>
        <ControlGroup
          appearance="subtle"
          textAlign="center"
          layout="full"
          {...props}
          options={options}
        />
      </React.Fragment>
    )
  })
