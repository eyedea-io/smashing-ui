import React, {useState} from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {Button} from '@smashing/button'
import {SideSheet} from '@smashing/side-sheet'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

const Wrapper = ({children}) => {
  const [isShown, setIsShown] = useState(false)

  return (
    <div>
      {children({setIsShown, isShown})}
      <Button onClick={() => setIsShown(true)}>Show Side Sheet</Button>
    </div>
  )
}

storiesOf('Core|Side Sheet', module)
  .addDecorator(story => (
    <SmashingThemeProvider theme={{}}>{story()}</SmashingThemeProvider>
  ))
  .add('position:left:default', () => (
    <Wrapper>
      {({setIsShown, isShown}) => (
        <SideSheet
          isShown={isShown}
          onCloseComplete={() => setIsShown(false)}
          containerProps={{
            display: 'flex',
            flex: '1',
            flexDirection: 'column'
          }}
        >
          {' '}
          Hello World!
        </SideSheet>
      )}
    </Wrapper>
  ))
  .add('position:top', () => (
    <Wrapper>
      {({setIsShown, isShown}) => (
        <SideSheet
          isShown={isShown}
          onCloseComplete={() => setIsShown(false)}
          position="top"
        >
          Hello World!
        </SideSheet>
      )}
    </Wrapper>
  ))
  .add('position:right', () => (
    <Wrapper>
      {({setIsShown, isShown}) => (
        <SideSheet
          isShown={isShown}
          onCloseComplete={() => setIsShown(false)}
          position="right"
        >
          Hello World!
        </SideSheet>
      )}
    </Wrapper>
  ))
  .add('position:left', () => (
    <Wrapper>
      {({setIsShown, isShown}) => (
        <SideSheet
          isShown={isShown}
          onCloseComplete={() => setIsShown(false)}
          position="bottom"
        >
          Hello World!
        </SideSheet>
      )}
    </Wrapper>
  ))
  .add('hide closing button', () => (
    <Wrapper>
      {({setIsShown, isShown}) => (
        <SideSheet
          isShown={isShown}
          onCloseComplete={() => setIsShown(false)}
          isClosingButtonVisible={false}
          containerProps={{
            display: 'flex',
            flex: '1',
            flexDirection: 'column'
          }}
        >
          {' '}
          Hello World!
        </SideSheet>
      )}
    </Wrapper>
  ))
