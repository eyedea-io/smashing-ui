import React, {useState} from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'
import {RadioButton} from '@smashing/radio-button'

addDecorator(withA11y)

const Wrapper = ({children}) => {
  const [isChecked, setIsChecked] = useState()

  return <div>{children({setIsChecked, isChecked})}</div>
}

storiesOf('Core|Radio button', module)
  .addDecorator(story => (
    <SmashingThemeProvider>{story()}</SmashingThemeProvider>
  ))
  .add('appearance:default', () => (
    <Wrapper>
      {({isChecked = false, setIsChecked}) => (
        <RadioButton
          name="name"
          value="1"
          checked={isChecked}
          onChange={({target}) => setIsChecked(target.checked)}
        >
          Example option
        </RadioButton>
      )}
    </Wrapper>
  ))
  .add('appearance:default checked', () => (
    <Wrapper>
      {({isChecked = true, setIsChecked}) => (
        <RadioButton
          name="name"
          value="1"
          checked={isChecked}
          onChange={({target}) => setIsChecked(target.checked)}
        >
          Example option
        </RadioButton>
      )}
    </Wrapper>
  ))
  .add('appearance:default disabled', () => (
    <Wrapper>
      {({isChecked = true, setIsChecked}) => (
        <RadioButton
          disabled
          name="name"
          value="1"
          checked={isChecked}
          onChange={({target}) => setIsChecked(target.checked)}
        >
          Example option
        </RadioButton>
      )}
    </Wrapper>
  ))
  .add('appearance:outline', () => (
    <Wrapper>
      {({isChecked = false, setIsChecked}) => (
        <RadioButton
          name="name"
          value="1"
          appearance="outline"
          checked={isChecked}
          onChange={({target}) => setIsChecked(target.checked)}
        >
          Example option
        </RadioButton>
      )}
    </Wrapper>
  ))
  .add('appearance:outline checked', () => (
    <Wrapper>
      {({isChecked = true, setIsChecked}) => (
        <RadioButton
          name="name"
          value="1"
          appearance="outline"
          checked={isChecked}
          onChange={({target}) => setIsChecked(target.checked)}
        >
          Example option
        </RadioButton>
      )}
    </Wrapper>
  ))
  .add('appearance:outline disabled', () => (
    <Wrapper>
      {({isChecked = true, setIsChecked}) => (
        <RadioButton
          disabled
          name="name"
          value="1"
          appearance="outline"
          checked={isChecked}
          onChange={({target}) => setIsChecked(target.checked)}
        >
          Example option
        </RadioButton>
      )}
    </Wrapper>
  ))
