import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {CalendarInput} from '@smashing/calendar-input'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

const WrappedCalendar = props => {
  const [date, setDate] = React.useState(props.value)

  return (
    <>
      <style>
        {
          'html, body {height: 100%; box-sizing: border-box; margin: 0;} body{ padding: 16px;}'
        }
      </style>
      <CalendarInput
        {...props}
        value={date}
        onChange={value => {
          setDate(value)
        }}
      />
    </>
  )
}

export const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g fill="currentColor">
      <path d="M17 9.17a1 1 0 0 0-1.41 0L12 12.71 8.46 9.17a1 1 0 0 0-1.41 0 1 1 0 0 0 0 1.42l4.24 4.24a1 1 0 0 0 1.42 0L17 10.59a1 1 0 0 0 0-1.42z"></path>
    </g>
  </svg>
)

export const ChevronUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g fill="currentColor">
      <path d="M17 13.41l-4.29-4.24a1 1 0 0 0-1.42 0l-4.24 4.24a1 1 0 0 0 0 1.42 1 1 0 0 0 1.41 0L12 11.29l3.54 3.54a1 1 0 0 0 .7.29 1 1 0 0 0 .71-.29 1 1 0 0 0 .05-1.42z"></path>
    </g>
  </svg>
)

addDecorator(withA11y)
storiesOf('Form|Calendar input', module)
  .addDecorator(story => (
    <SmashingThemeProvider
      theme={{
        defaults: {
          calendarInput: {}
        }
      }}
    >
      {story()}
    </SmashingThemeProvider>
  ))
  .add('appearance:default', () => <WrappedCalendar />)
  .add('disabled', () => <WrappedCalendar disabled />)
  .add('appearance:default with time', () => <WrappedCalendar hasTime />)
  .add('hasDay:false', () => (
    <WrappedCalendar
      hasDay={false}
      inputAppearance="outline"
      popoverAppearance="dropdown"
    />
  ))
  .add('appearance:outline', () => (
    <WrappedCalendar inputAppearance="outline" popoverAppearance="dropdown" />
  ))
  .add('appearance:outline with time', () => (
    <WrappedCalendar
      inputAppearance="outline"
      hasTime
      popoverAppearance="accordion"
    />
  ))
  .add('popoverAppearance:dropdown', () => (
    <WrappedCalendar inputAppearance="outline" popoverAppearance="dropdown" />
  ))
  .add('height', () => (
    <>
      <WrappedCalendar hasTime width={180} height={24} />
      <br />
      <WrappedCalendar hasTime />
      <br />
      <WrappedCalendar hasTime width={230} height={40} />
      <br />
      <WrappedCalendar hasTime width={270} height={48} />
      <br />
    </>
  ))
  .add('custom icon', () => (
    <>
      <WrappedCalendar hasTime iconAfter={ChevronDownIcon} />
      <br />
      <WrappedCalendar
        hasTime
        iconAfter={({isShown}) =>
          isShown ? <ChevronUpIcon /> : <ChevronDownIcon />
        }
      />
    </>
  ))
