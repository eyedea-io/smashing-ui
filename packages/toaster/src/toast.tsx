import * as React from 'react'
import styled from 'styled-components'
import {Transition} from 'react-transition-group'
import {TransitionStatus} from 'react-transition-group/Transition'
import {useDefaults} from '@smashing/theme'
import {Alert} from '@smashing/alert'

const animationEasing = {
  deceleration: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  acceleration: 'cubic-bezier(0.4, 0.0, 1, 1)',
  spring: 'cubic-bezier(0.175, 0.885, 0.320, 1.175)'
}

const ANIMATION_DURATION = 200

const WrapperAnimated = styled.div<{state: TransitionStatus}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 0;
  transition: all ${ANIMATION_DURATION}ms ${animationEasing.deceleration};

  ${_ => ({
    transform: _.state === 'entering' ? 'translateY(-120%)' : 'translateY(0%)',
    opacity: _.state === 'entered' ? 1 : 0
  })}
`

interface Props {
  /**
   * The z-index of the toast.
   */
  zIndex?: number

  /**
   * Duration of the toast.
   */
  duration?: number

  /**
   * Function called when the toast is all the way closed.
   */
  onRemove?: () => void

  /**
   * The type of the alert.
   */
  intent?: 'success' | 'warning' | 'danger' | 'info'

  /**
   * The title of the alert.
   */
  title?: string

  /**
   * Description of the alert.
   */
  children?: React.ReactChildren

  /**
   * When true, show a close icon button inside of the toast.
   */
  hasCloseButton?: boolean

  /**
   * When false, will close the Toast and call onRemove when finished.
   */
  isShown?: boolean
}

export const Toast: React.FC<Props> = ({children, ...props}) => {
  const [isShown, setIsShown] = React.useState(true)
  const [closeTimer, setCloseTimer] = React.useState<number | null>(null)
  const [height, setHeight] = React.useState(0)
  const defaults = useDefaults<any>('toast', props, {
    intent: 'success',
    zIndex: 10,
    duration: 1000,
    onRemove: () => undefined,
    title: '',
    hasCloseButton: false,
    isShown: true
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
          <div ref={onRef} style={{padding: 8}}>
            <Alert
              appearance="card"
              intent={defaults.intent}
              title={defaults.title}
            >
              {children}
            </Alert>
          </div>
        </WrapperAnimated>
      )}
    </Transition>
  )
}

declare module 'styled-components' {
  export interface SmashingToastDefaults
    extends Partial<{
      toast?: Partial<Props>
    }> {}
}
