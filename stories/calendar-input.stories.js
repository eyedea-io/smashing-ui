import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {CalendarInput} from '@smashing/calendar-input'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

const WrappedCalendar = props => {
  const [date, setDate] = React.useState(new Date())
  return <CalendarInput value={date} onChange={setDate} {...props} />
}

addDecorator(withA11y)
storiesOf('Core|Calendar input', module)
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
  .add('appearance:default', () => <WrappedCalendar />)
  .add('appearance:outline', () => <WrappedCalendar appearance="outline" />)
