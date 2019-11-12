import React, {useState} from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {TextInput} from '@smashing/text-input'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'
import {SearchRegular, EyeOpenRegular, EyeClosedRegular} from './common/icon'

addDecorator(withA11y)

storiesOf('Core|TextInput', module)
  .addDecorator(story => (
    <SmashingThemeProvider
      theme={{
        defaults: {
          textInput: {}
        },
        fontFamilies: {
          display: 'arial'
        }
      }}
    >
      {story()}
    </SmashingThemeProvider>
  ))
  .add('appearance:default', () => (
    <React.Fragment>
      <div>
        <TextInput placeholder="Your name" />
      </div>
    </React.Fragment>
  ))
  .add('appearance:underline', () => (
    <React.Fragment>
      <div>
        <TextInput appearance="underline" placeholder="Your name" />
      </div>
    </React.Fragment>
  ))
  .add('appearance:neutral', () => (
    <React.Fragment>
      <div>
        <TextInput appearance="neutral" placeholder="Your name" />
      </div>
    </React.Fragment>
  ))
  .add('appearance:minimal', () => (
    <React.Fragment>
      <div>
        <TextInput appearance="minimal" placeholder="Your name" />
      </div>
    </React.Fragment>
  ))
  .add('appearance:outline', () => (
    <React.Fragment>
      <div>
        <TextInput appearance="outline" placeholder="Your name" />
      </div>
    </React.Fragment>
  ))
  .add('appearance:default:disabled', () => (
    <React.Fragment>
      <div>
        <TextInput placeholder="Your name" value="Your name" disabled />
      </div>
    </React.Fragment>
  ))
  .add('appearance:minimal:disabled', () => (
    <React.Fragment>
      <div>
        <TextInput
          appearance="minimal"
          placeholder="Your name"
          value="Your name"
          disabled
        />
      </div>
    </React.Fragment>
  ))
  .add('appearance:underline:disabled', () => (
    <React.Fragment>
      <div>
        <TextInput
          appearance="underline"
          placeholder="Your name"
          value="Your name"
          disabled
        />
      </div>
    </React.Fragment>
  ))
  .add('appearance:neutral:disabled', () => (
    <React.Fragment>
      <div>
        <TextInput
          appearance="neutral"
          placeholder="Your name"
          value="Your name"
          disabled
        />
      </div>
    </React.Fragment>
  ))
  .add('appearance:outline:disabled', () => (
    <React.Fragment>
      <div>
        <TextInput appearance="outline" value="Test value" disabled />
      </div>
    </React.Fragment>
  ))
  .add('appearance:outline:with suffix', () => (
    <React.Fragment>
      <div>
        <TextInput appearance="outline" suffix="km/h" />
      </div>
    </React.Fragment>
  ))
  .add('appearance:outline:no input version', () => (
    <React.Fragment>
      <div>
        <TextInput appearance="underline" readOnly value="test" />
      </div>
    </React.Fragment>
  ))
  .add('borderRadius:30', () => (
    <React.Fragment>
      <div>
        <TextInput placeholder="Your name" borderRadius={30} />
      </div>
    </React.Fragment>
  ))
  .add('height:40', () => (
    <React.Fragment>
      <div>
        <TextInput placeholder="Your name" height={40} />
      </div>
    </React.Fragment>
  ))
  .add('height:undefined', () => (
    <React.Fragment>
      <div>
        <TextInput placeholder="Your name" height={undefined} />
      </div>
    </React.Fragment>
  ))
  .add('appearance:default:invalid', () => (
    <React.Fragment>
      <div>
        <TextInput placeholder="Your name" invalid />
      </div>
    </React.Fragment>
  ))
  .add('appearance:minimal:invalid', () => (
    <React.Fragment>
      <div>
        <TextInput placeholder="Your name" invalid appearance="minimal" />
      </div>
    </React.Fragment>
  ))
  .add('appearance:neutral:invalid', () => (
    <React.Fragment>
      <div>
        <TextInput placeholder="Your name" invalid appearance="neutral" />
      </div>
    </React.Fragment>
  ))
  .add('appearance:underline:invalid', () => (
    <React.Fragment>
      <div>
        <TextInput placeholder="Your name" invalid appearance="underline" />
      </div>
    </React.Fragment>
  ))
  .add('full', () => (
    <React.Fragment>
      <div>
        <TextInput placeholder="Your name" full />
      </div>
    </React.Fragment>
  ))
  .add('with affixes', () => {
    const [active, setActive] = useState(false)
    const toggleType = ({current}) => {
      if (current.type === 'text') {
        current.type = 'password'
        return setActive(false)
      }
      current.type = 'text'
      setActive(true)
    }
    const focus = ({current}) => current.focus()

    return (
      <React.Fragment>
        <TextInput
          placeholder="Show and hide password"
          type="password"
          onClickAfter={toggleType}
          affixAfter={active ? EyeOpenRegular : EyeClosedRegular}
        />
        <br />
        <TextInput
          placeholder="Focus on icon click..."
          type="text"
          onClickBefore={focus}
          affixBefore={SearchRegular}
          affixAfter="min"
          height={48}
        />
        <br />
        <TextInput placeholder="Text suffix..." type="text" affixAfter="km/h" />
        <br />
        <TextInput
          placeholder="Invalid text suffix..."
          type="text"
          affixAfter="h"
          invalid
          height={48}
        />
        <br />
        <TextInput disabled placeholder="Disabled" affixAfter={SearchRegular} />
        <br />
        <TextInput
          invalid
          defaultValue="Invalid..."
          affixAfter={SearchRegular}
        />
      </React.Fragment>
    )
  })
