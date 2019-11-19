import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {ButtonGroup} from '@smashing/button-group'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

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
        <ButtonGroup
          onChange={v => setValue(v)}
          value={value}
          options={[
            {
              label: 'first button',
              value: 1
            },
            {
              label: 'second button',
              value: 2
            }
          ]}
        />
        <br />
        <ButtonGroup
          appearance="flat"
          onChange={v => setValue(v)}
          value={value}
          options={[
            {
              label: 'first button',
              value: 1
            },
            {
              label: 'second button',
              value: 2
            },
            {
              label: 'third button',
              value: 3
            }
          ]}
        />
        <br />
        <ButtonGroup
          appearance="primary"
          onChange={v => setValue(v)}
          value={value}
          options={[
            {
              label: 'first button',
              value: 1
            },
            {
              label: 'second button',
              value: 2
            },
            {
              label: 'third button',
              value: 3
            }
          ]}
        />
        <br />
        <ButtonGroup
          appearance="minimal"
          onChange={v => setValue(v)}
          value={value}
          options={[
            {
              label: 'first button',
              value: 1
            },
            {
              label: 'second button',
              value: 2
            },
            {
              label: 'third button',
              value: 3
            }
          ]}
        />
        <br />
        <ButtonGroup
          appearance="subtle"
          onChange={v => setValue(v)}
          value={value}
          options={[
            {
              label: 'first button',
              value: 1
            },
            {
              label: 'second button',
              value: 2
            },
            {
              label: 'third button',
              value: 3
            }
          ]}
        />
      </React.Fragment>
    )
  })
