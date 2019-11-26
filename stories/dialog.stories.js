import React, {useState} from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {Dialog} from '@smashing/dialog'
import {Button} from '@smashing/button'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

const Wrapper = ({children}) => {
  const [isShown, setIsShown] = useState(false)

  return (
    <div>
      {children({setIsShown, isShown})}
      <Button onClick={() => setIsShown(true)}>Show Dialog</Button>
    </div>
  )
}

storiesOf('Overlays|Dialog', module)
  .addDecorator(story => (
    <SmashingThemeProvider theme={{}}>{story()}</SmashingThemeProvider>
  ))
  .add('default', () => (
    <Wrapper>
      {({setIsShown, isShown}) => (
        <Dialog
          title="Example dialog"
          isShown={isShown}
          onCloseComplete={() => setIsShown(false)}
        >
          Hello
        </Dialog>
      )}
    </Wrapper>
  ))
  .add('options', () => (
    <Wrapper>
      {({setIsShown, isShown}) => (
        <Dialog
          title="Example dialog"
          isShown={isShown}
          onCloseComplete={() => setIsShown(false)}
          cancelAppearance="subtle"
          confirmAppearance="subtle"
          cancelLabel="Abort"
          intent="success"
          confirmLabel="Go"
          isFooterSeparated={false}
          isHeaderSeparated={false}
        >
          Hello
        </Dialog>
      )}
    </Wrapper>
  ))
