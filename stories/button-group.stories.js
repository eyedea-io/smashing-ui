import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {ButtonGroup} from '@smashing/button-group'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

storiesOf('Core|ButtonGroup', module)
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
  .add('appearance:default', () => {
    const [value, setValue] = React.useState(1)

    return (
      <React.Fragment>
        <p>
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
        </p>
      </React.Fragment>
    )
  })
