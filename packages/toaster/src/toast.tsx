import * as React from 'react'
import {Transition} from 'react-transition-group'
import {useDefaults} from '@smashing/theme'
import {Alert} from '@smashing/alert'
import {ToastProps} from './types'
import {
  ANIMATION_DURATION,
  WrapperAnimated,
  ToastWrapper,
  ToastCloseIcon,
  ToastCloseIconWrapper
} from './styles'

export const Toast: React.FC<ToastProps> = ({children, ...props}) => {
  const [isShown, setIsShown] = React.useState(true)
  const [closeTimer, setCloseTimer] = React.useState<number | null>(null)
  const [height, setHeight] = React.useState(0)
  const defaults = useDefaults<any>('toast', props, {
    intent: 'success',
    zIndex: 10,
    duration: 1000,
    onRemove: () => undefined,
    title: '',
    hasCloseButton: true,
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
    if (props.duration) {
      setCloseTimer(
        setTimeout(() => {
          close()
        }, props.duration * 1000)
      )
    }
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
      timeout={ANIMATION_DURATION}
      onExited={defaults.onRemove}
    >
      {state => (
        <WrapperAnimated
          state={state}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            height,
            zIndex: defaults.zIndex,
            marginBottom: isShown ? 0 : -height
          }}
        >
          <ToastWrapper ref={onRef}>
            {defaults.hasCloseButton && (
              <ToastCloseIconWrapper onClick={close}>
                <ToastCloseIcon />
              </ToastCloseIconWrapper>
            )}
            <Alert
              appearance={defaults.appearance}
              intent={defaults.intent}
              title={defaults.title}
            >
              {children}
            </Alert>
          </ToastWrapper>
        </WrapperAnimated>
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
