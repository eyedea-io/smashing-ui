import React, {useState} from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {Checkbox} from '@smashing/checkbox'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

const wrapperStyle = {
  width: 300
}

const Wrapper = ({children}) => {
  const [isChecked, setIsChecked] = useState(false)

  return <div style={wrapperStyle}>{children({setIsChecked, isChecked})}</div>
}

const svgStyle = {
  marginRight: 8,
  flexShrink: 0
}

const icon = (
  <svg
    width="16"
    height="12"
    viewBox="0 0 16 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={svgStyle}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.4661 10.9073C6.04232 10.4809 6.04232 9.78957 6.4661 9.36317C7.31414 8.5099 8.68908 8.5099 9.53712 9.36317C9.9609 9.78957 9.9609 10.4809 9.53712 10.9073L8.76894 11.6802C8.34515 12.1066 7.65807 12.1066 7.23429 11.6802L6.4661 10.9073Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.0727 7.8216C9.37566 6.11791 6.62425 6.11791 4.92724 7.8216C4.50298 8.24752 3.81513 8.24752 3.39087 7.8216C2.96662 7.39568 2.96662 6.70512 3.39087 6.2792C5.9364 3.72367 10.0635 3.72367 12.609 6.2792C13.0333 6.70512 13.0333 7.39568 12.609 7.8216C12.1848 8.24752 11.4969 8.24752 11.0727 7.8216Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.318191 4.73682C-0.106064 4.3109 -0.106064 3.62034 0.318191 3.19442C4.56074 -1.06481 11.4393 -1.06481 15.6818 3.19442C16.1061 3.62034 16.1061 4.3109 15.6818 4.73682C15.2576 5.16274 14.5697 5.16274 14.1454 4.73682C10.7514 1.32944 5.24859 1.32944 1.85455 4.73682C1.4303 5.16274 0.742446 5.16274 0.318191 4.73682Z"
      fill="currentColor"
    />
  </svg>
)

storiesOf('Core|Checkbox', module)
  .addDecorator(story => (
    <SmashingThemeProvider
      theme={{
        defaults: {
          checkbox: {}
        }
      }}
    >
      {story()}
    </SmashingThemeProvider>
  ))
  .add('appearance:primary default', () => (
    <Wrapper>
      {({isChecked, setIsChecked}) => (
        <Checkbox onChange={() => setIsChecked(!isChecked)} checked={isChecked}>
          By clicking “Sign up” I agree that I have read and accepted the Terms
          and conditions.
        </Checkbox>
      )}
    </Wrapper>
  ))
  .add('appearance:primary checked', () => (
    <Wrapper>
      {({isChecked, setIsChecked}) => (
        <Checkbox
          onChange={() => setIsChecked(!isChecked)}
          checked={!isChecked}
        >
          By clicking “Sign up” I agree that I have read and accepted the Terms
          and conditions.
        </Checkbox>
      )}
    </Wrapper>
  ))
  .add('disabled', () => (
    <React.Fragment>
      <Checkbox disabled>Stay signed in</Checkbox>
    </React.Fragment>
  ))
  .add('checked disabled', () => (
    <React.Fragment>
      <Checkbox checked disabled>
        Stay signed in
      </Checkbox>
    </React.Fragment>
  ))
  .add('appearance:minimal default', () => (
    <Wrapper>
      {({isChecked, setIsChecked}) => (
        <Checkbox
          onChange={() => setIsChecked(!isChecked)}
          checked={isChecked}
          appearance="minimal"
        >
          By clicking “Sign up” I agree that I have read and accepted the Terms
          and conditions.
        </Checkbox>
      )}
    </Wrapper>
  ))
  .add('appearance:minimal checked', () => (
    <Wrapper>
      {({isChecked, setIsChecked}) => (
        <Checkbox
          onChange={() => setIsChecked(!isChecked)}
          appearance="minimal"
          checked={!isChecked}
        >
          By clicking “Sign up” I agree that I have read and accepted the Terms
          and conditions.
        </Checkbox>
      )}
    </Wrapper>
  ))
  .add('appearance:card', () => (
    <Wrapper>
      {({isChecked, setIsChecked}) => (
        <Checkbox
          onChange={() => setIsChecked(!isChecked)}
          checked={isChecked}
          appearance="card"
        >
          {' '}
          {icon}
          By clicking “Sign up” I agree that I have read and accepted the Terms
          and conditions.
        </Checkbox>
      )}
    </Wrapper>
  ))
  .add('appearance:card checked', () => (
    <Wrapper>
      {({isChecked, setIsChecked}) => (
        <Checkbox
          onChange={() => setIsChecked(!isChecked)}
          appearance="card"
          checked={!isChecked}
        >
          {icon}
          By clicking “Sign up” I agree that I have read and accepted the Terms
          and conditions.
        </Checkbox>
      )}
    </Wrapper>
  ))
  .add('appearance:card disabled', () => (
    <Wrapper>
      {({isChecked, setIsChecked}) => (
        <Checkbox
          onChange={() => setIsChecked(!isChecked)}
          appearance="card"
          disabled
        >
          {icon}
          By clicking “Sign up” I agree that I have read and accepted the Terms
          and conditions.
        </Checkbox>
      )}
    </Wrapper>
  ))
  .add('appearance:outline default', () => (
    <Wrapper>
      {({isChecked, setIsChecked}) => (
        <Checkbox
          appearance="outline"
          onChange={() => setIsChecked(!isChecked)}
          checked={isChecked}
        >
          By clicking “Sign up” I agree that I have read and accepted the Terms
          and conditions.
        </Checkbox>
      )}
    </Wrapper>
  ))
  .add('appearance:outline checked', () => (
    <Wrapper>
      {({isChecked, setIsChecked}) => (
        <Checkbox
          appearance="outline"
          onChange={() => setIsChecked(!isChecked)}
          checked={!isChecked}
        >
          By clicking “Sign up” I agree that I have read and accepted the Terms
          and conditions.
        </Checkbox>
      )}
    </Wrapper>
  ))
  .add('appearance:outline checked disabled', () => (
    <Wrapper>
      {({isChecked, setIsChecked}) => (
        <Checkbox
          disabled
          appearance="outline"
          onChange={() => setIsChecked(!isChecked)}
          checked={!isChecked}
        >
          By clicking “Sign up” I agree that I have read and accepted the Terms
          and conditions.
        </Checkbox>
      )}
    </Wrapper>
  ))
  .add('appearance:switcher default', () => (
    <Wrapper>
      {({isChecked, setIsChecked}) => (
        <Checkbox
          appearance="switcher"
          onChange={() => setIsChecked(!isChecked)}
          checked={isChecked}
        >
          By clicking “Sign up” I agree that I have read and accepted the Terms
          and conditions.
        </Checkbox>
      )}
    </Wrapper>
  ))
  .add('appearance:switcher checked', () => (
    <Wrapper>
      {({isChecked, setIsChecked}) => (
        <Checkbox
          appearance="switcher"
          onChange={() => setIsChecked(!isChecked)}
          checked={!isChecked}
        >
          By clicking “Sign up” I agree that I have read and accepted the Terms
          and conditions.
        </Checkbox>
      )}
    </Wrapper>
  ))
  .add('appearance:switcher checked disabled', () => (
    <Checkbox disabled appearance="switcher">
      By clicking “Sign up” I agree that I have read and accepted the Terms and
      conditions.
    </Checkbox>
  ))
