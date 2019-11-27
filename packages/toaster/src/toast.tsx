import * as React from 'react'
import {Transition} from 'react-transition-group'
import {useDefaults} from '@smashing/theme'
import {ToastProps} from './types'
import * as S from './styles'

export const Toast: React.FC<ToastProps> = ({children, ...props}) => {
  const [isShown, setIsShown] = React.useState(true)
  const [closeTimer, setCloseTimer] = React.useState<number | null>(null)
  const [height, setHeight] = React.useState(0)
  const defaults = useDefaults<any>('toast', props, {
    intent: 'success',
    zIndex: 10,
    duration: 5000,
    onRemove: () => undefined,
    title: '',
    hasClose: true,
    isShown: true,
    appearance: 'card'
  })

  const clearCloseTimer = React.useCallback(() => {
    if (closeTimer) {
      clearTimeout(closeTimer)
      setCloseTimer(null)
    }
  }, [closeTimer])

  const close = React.useCallback(() => {
    clearCloseTimer()
    setIsShown(false)
  }, [])

  const startCloseTimer = React.useCallback(() => {
    setCloseTimer(
      setTimeout(() => {
        close()
      }, defaults.duration)
    )
  }, [])

  const handleMouseEnter = () => {
    clearCloseTimer()
  }

  const handleMouseLeave = () => {
    startCloseTimer()
  }

  React.useEffect(() => {
    setIsShown(defaults.isShown)
  }, [defaults.isShown])

  React.useEffect(() => {
    if (defaults.duration) {
      startCloseTimer()
    }

    return () => {
      clearCloseTimer()
    }
  }, [])

  const onRef = React.useCallback(ref => {
    if (ref === null) return

    const {height: refHeight} = ref.getBoundingClientRect()

    setHeight(refHeight)
  }, [])

  return (
    <Transition
      in={isShown}
      unmountOnExit
      appear
      timeout={S.ANIMATION_DURATION}
      onExited={defaults.onRemove}
    >
      {state => (
        <S.WrapperAnimated
          state={state}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            height,
            zIndex: defaults.zIndex,
            marginBottom: isShown ? '10px' : -height
          }}
        >
          <S.Wrapper ref={onRef} hasClose={defaults.hasClose}>
            <S.Alert
              appearance={defaults.appearance}
              intent={defaults.intent}
              title={defaults.title}
              hasClose={defaults.hasClose}
              closeOnClick={defaults.hasClose && close}
            >
              {children}
            </S.Alert>
          </S.Wrapper>
        </S.WrapperAnimated>
      )}
    </Transition>
  )
}

declare module 'styled-components' {
  export interface SmashingToastDefaults
    extends Partial<{
      toaster?: Partial<ToastProps>
    }> {}
}
