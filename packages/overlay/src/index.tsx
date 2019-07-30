import * as React from 'react'
import {Transition} from 'react-transition-group'
import {Portal} from '@smashing/portal'
import {Stack} from '@smashing/stack'
import {constants} from '@smashing/theme'
import styled, {keyframes} from 'styled-components'
import {useCallback} from 'react'

const {stackingOrder: StackingOrder} = constants

const animationEasing = {
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  deceleration: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  acceleration: 'cubic-bezier(0.4, 0.0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
  spring: 'cubic-bezier(0.175, 0.885, 0.320, 1.175)'
}

const ANIMATION_DURATION = 240

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const fadeOutAnimation = keyframes`
  from: {
    opacity: 1;
  }
  to: {
    opacity: 0;
  }
`

const S = {
  Background: styled.div.attrs({})<{zIndex: number}>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: ${_ => _.zIndex};
    display: flex;
    align-items: flex-start;
    justify-content: center;

    &::before {
      ${_ => _.theme.elevation.overlay};
      left: 0;
      top: 0;
      position: fixed;
      display: block;
      width: 100%;
      height: 100%;
      content: " ";
    }

    &[data-state="entering"]::before,
    &[data-state="entered"]::before {
      animation: ${fadeInAnimation} ${ANIMATION_DURATION}ms
        ${animationEasing.deceleration} both;
    }
    &[data-state="exiting"]::before,
    &[data-state="exited"]::before {
      animation: ${fadeOutAnimation} ${ANIMATION_DURATION}ms
        ${animationEasing.acceleration} both;
    }
  `
}

export const Overlay: React.FC<OverlayProps> = ({
  shouldCloseOnClick = true,
  shouldCloseOnEscapePress = true,
  preventBodyScrolling = false,
  onExit = () => {},
  onExiting = () => {},
  onExited = () => {},
  onEnter = () => {},
  onEntering = () => {},
  onEntered = () => {},
  ...props
}) => {
  const containerElement = React.useRef<HTMLDivElement | null>(null)
  const previousActiveElement = React.useRef<HTMLElement | null>(null)
  const [exiting, setExiting] = React.useState(false)
  const [exited, setExited] = React.useState(!props.isShown)

  React.useEffect(() => {
    if (exited === true && props.isShown) {
      setExited(false)
    }
  })

  /**
   * Methods borrowed from BlueprintJS
   * https://github.com/palantir/blueprint/blob/release/2.0.0/packages/core/src/components/overlay/overlay.tsx
   */
  const bringFocusInsideOverlay = () => {
    // Always delay focus manipulation to just before repaint to prevent scroll jumping
    return requestAnimationFrame(() => {
      // Container ref may be undefined between component mounting and Portal rendering
      // activeElement may be undefined in some rare cases in IE

      if (
        containerElement.current == null ||
        document.activeElement == null ||
        !props.isShown
      ) {
        return
      }

      const isFocusOutsideModal = !containerElement.current.contains(
        document.activeElement
      )
      if (isFocusOutsideModal) {
        // Element marked autofocus has higher priority than the other clowns
        const autofocusElement = containerElement.current.querySelector<
          HTMLElement
        >('[autofocus]')
        const wrapperElement = containerElement.current.querySelector<
          HTMLElement
        >('[tabindex]')
        const buttonElement = containerElement.current.querySelector<
          HTMLElement
        >('button')

        if (autofocusElement) {
          autofocusElement.focus()
        } else if (wrapperElement) {
          wrapperElement.focus()
        } else if (buttonElement) {
          buttonElement.focus()
        }
      }
    })
  }

  const bringFocusBackToTarget = () => {
    return requestAnimationFrame(() => {
      if (containerElement.current == null || document.activeElement == null) {
        return
      }

      const isFocusInsideModal = containerElement.current.contains(
        document.activeElement
      )

      // Bring back focus on the target.
      if (
        previousActiveElement.current &&
        (document.activeElement === document.body || isFocusInsideModal)
      ) {
        previousActiveElement.current.focus()
      }
    })
  }

  const close = useCallback(() => {
    const shouldClose = safeInvoke(props.onBeforeClose)
    if (shouldClose !== false) {
      setExiting(true)
    }
  }, [props.onBeforeClose])

  const onEsc = useCallback(
    (e: {keyCode: number}) => {
      // Esc key
      if (e.keyCode === 27 && shouldCloseOnEscapePress) {
        close()
      }
    },
    [close, shouldCloseOnEscapePress]
  )

  const handleBodyScroll = useCallback(
    (preventScroll: boolean) => {
      if (preventBodyScrolling) {
        preventBodyScroll(preventScroll)
      }
    },
    [preventBodyScrolling]
  )

  const handleEnter = () => {
    handleBodyScroll(true)
    onEnter()
  }

  const handleEntering = (node: HTMLElement) => {
    document.body.addEventListener('keydown', onEsc, false)
    onEntering(node)
  }

  const handleEntered = (node: HTMLElement) => {
    previousActiveElement.current = document.activeElement as HTMLElement | null
    bringFocusInsideOverlay()
    onEntered(node)
  }

  const handleExit = () => {
    handleBodyScroll(false)
    onExit()
  }

  const handleExiting = (node: HTMLElement) => {
    document.body.removeEventListener('keydown', onEsc, false)
    bringFocusBackToTarget()
    onExiting(node)
  }

  const handleExited = (node: HTMLElement) => {
    setExiting(false)
    setExited(true)
    onExited(node)
  }

  const handleBackdropClick = (e: {target: any; currentTarget: any}) => {
    if (e.target !== e.currentTarget || !shouldCloseOnClick) {
      return
    }

    close()
  }

  const {containerProps = {}, isShown, children} = props

  React.useEffect(() => {
    return () => {
      handleBodyScroll(false)
      document.body.removeEventListener('keydown', onEsc, false)
    }
  }, [handleBodyScroll, onEsc])

  if (exited) return null

  return (
    <Stack value={StackingOrder.OVERLAY}>
      {zIndex => (
        <Portal>
          <Transition
            appear
            unmountOnExit
            timeout={ANIMATION_DURATION}
            in={isShown && !exiting}
            onExit={handleExit}
            onExiting={handleExiting}
            onExited={handleExited}
            onEnter={handleEnter}
            onEntering={handleEntering}
            onEntered={handleEntered}
          >
            {state => (
              <S.Background
                onClick={handleBackdropClick}
                ref={containerElement}
                data-state={state}
                zIndex={zIndex}
                {...containerProps}
              >
                {typeof children === 'function'
                  ? children({
                      state,
                      close
                    })
                  : children}
              </S.Background>
            )}
          </Transition>
        </Portal>
      )}
    </Stack>
  )
}

export interface OverlayProps {
  /**
   * Children can be a node or a function accepting `close: func`
   * and `state: ENTERING | ENTERED | EXITING | EXITED`.
   */
  children: React.ReactNode

  /**
   * Show the component; triggers the enter or exit states.
   */
  isShown?: boolean

  /**
   * Props to be passed through on the inner Box.
   */
  containerProps?: object

  /**
   * Whether or not to prevent body scrolling outside the context of the overlay
   */
  preventBodyScrolling?: boolean

  /**
   * Boolean indicating if clicking the overlay should close the overlay.
   */
  shouldCloseOnClick?: boolean

  /**
   * Boolean indicating if pressing the esc key should close the overlay.
   */
  shouldCloseOnEscapePress?: boolean

  /**
   * Function called when overlay is about to close.
   * Return `false` to prevent the sheet from closing.
   */
  onBeforeClose?: () => boolean

  /**
   * Callback fired before the "exiting" status is applied.
   */
  onExit?: () => void

  /**
   * Callback fired after the "exiting" status is applied.
   */
  onExiting?: (node: HTMLElement) => void

  /**
   * Callback fired after the "exited" status is applied.
   */
  onExited?: (node: HTMLElement) => void

  /**
   * Callback fired before the "entering" status is applied.
   */
  onEnter?: () => void

  /**
   * Callback fired after the "entering" status is applied.
   */
  onEntering?: (node: HTMLElement) => void

  /**
   * Callback fired after the "entered" status is applied.
   */
  onEntered?: (node: HTMLElement) => void
}

function safeInvoke(fn: any, ...args: any[]) {
  if (typeof fn === 'function') {
    return fn(...args)
  }
}

let previousOverflow: string | null
let previousPaddingRight: string | null

function preventBodyScroll(preventScroll: boolean) {
  /** Get the width before toggling the style so we can calculate the scrollbar width for a smooth, jankless style change */
  const {width} = document.body.getBoundingClientRect()

  /** Apply or remove overflow style */
  if (preventScroll) {
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = previousOverflow || ''
  }

  /** Get the _new width_ of the body (this will tell us the scrollbar width) */
  const newWidth = document.body.getBoundingClientRect().width
  const scrollBarWidth = newWidth - width

  /** If there's a diff due to scrollbars, then account for it with padding */
  if (preventScroll) {
    previousPaddingRight = document.body.style.paddingRight
    document.body.style.paddingRight = Math.max(0, scrollBarWidth || 0) + 'px'
  } else {
    document.body.style.paddingRight = previousPaddingRight || ''
  }
}
