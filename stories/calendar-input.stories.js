import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {Calendar} from '@smashing/calendar-input'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

storiesOf('Core|Calendar', module)
  .addDecorator(story => (
    <SmashingThemeProvider
      theme={{
        defaults: {
          calendar: {}
        }
      }}
    >
      {story()}
    </SmashingThemeProvider>
  ))
  .add('appearance:default', () => {
    const [date, setDate] = React.useState(new Date())
    return (
      <React.Fragment>
        <Calendar value={date} onChange={setDate} />
      </React.Fragment>
    )
  })