import React, {useState} from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'
import {Radio} from '@smashing/radio'

addDecorator(withA11y)
addDecorator(story => <SmashingThemeProvider>{story()}</SmashingThemeProvider>)

const Wrapper = ({children}) => {
  const [value, setValue] = useState()

  return (
    <div style={{padding: '8px 0'}}>
      {children({
        onChange: event => {
          setValue(event.target.value)
        },
        value
      })}
    </div>
  )
}

storiesOf('Form|Radio/appearance: default', module)
  .add('default', () => (
    <Wrapper>
      {control => (
        <Radio name="order" value="1" {...control}>
          Example option
        </Radio>
      )}
    </Wrapper>
  ))
  .add('checked', () => (
    <Wrapper>
      {control => (
        <Radio name="order" {...control} checked={true}>
          Example option
        </Radio>
      )}
    </Wrapper>
  ))
  .add('disabled', () => (
    <Wrapper>
      {control => (
        <Radio disabled name="order" {...control}>
          Example option
        </Radio>
      )}
    </Wrapper>
  ))
  .add('disabled checked', () => (
    <Wrapper>
      {control => (
        <Radio disabled name="order" {...control} checked>
          Example option
        </Radio>
      )}
    </Wrapper>
  ))
  .add('size', () => (
    <>
      <Wrapper>
        {control =>
          [16, 24, 32, 40].map(size => (
            <Radio
              key={size}
              size={size}
              name="size"
              value={size}
              checked={parseInt(control.value, 10) === size}
              onChange={control.onChange}
            >
              Example option size {size}
            </Radio>
          ))
        }
      </Wrapper>
    </>
  ))

storiesOf('Form|Radio/appearance: outline', module)
  .add('default', () => (
    <Wrapper>
      {control => (
        <Radio name="order" appearance="outline" {...control}>
          Example option
        </Radio>
      )}
    </Wrapper>
  ))
  .add('checked', () => (
    <Wrapper>
      {control => (
        <Radio name="order" appearance="outline" {...control} checked={true}>
          Example option
        </Radio>
      )}
    </Wrapper>
  ))
  .add('disabled', () => (
    <Wrapper>
      {control => (
        <Radio disabled name="order" appearance="outline" {...control}>
          Example option
        </Radio>
      )}
    </Wrapper>
  ))
  .add('disabled checked', () => (
    <Wrapper>
      {control => (
        <Radio disabled name="order" appearance="outline" {...control} checked>
          Example option
        </Radio>
      )}
    </Wrapper>
  ))
  .add('size', () => (
    <>
      <Wrapper>
        {control =>
          [16, 24, 32, 40].map(size => (
            <Radio
              key={size}
              size={size}
              name="size"
              appearance="outline"
              value={size}
              checked={parseInt(control.value, 10) === size}
              onChange={control.onChange}
            >
              Example option size {size}
            </Radio>
          ))
        }
      </Wrapper>
    </>
  ))
