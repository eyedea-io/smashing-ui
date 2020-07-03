import * as React from 'react'
import {Positioner} from '@smashing/positioner'
import {Tooltip} from '@smashing/tooltip'
import {constants} from '@smashing/theme'
import {Portal} from '@smashing/portal'
import styled from 'styled-components'

const MAX_Z_INDEX = '2147483638'

const {position: Position} = constants
export type Position =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'right'

export interface PopoverProps {
  /**
   * The position the Popover is on. Smart positioning might override this.
   */
  position?: Position

  /**
   * When true, the Popover is manually shown.
   */
  isShown?: boolean

  /**
   * The content of the Popover.
   */
  content: React.ReactNode | ((props: {close: () => void}) => React.ReactNode)

  /**
   * The target button of the Popover.
   * When a function the following arguments are passed:
   * ({ toggle: Function -> Void, getRef: Function -> Ref, isShown: Bool })
   */
  children:
    | React.ReactNode
    | ((props: {
        toggle: () => void
        getRef: (ref: any) => void
        isShown: boolean
      }) => React.ReactNode)

  /**
   * The display property passed to the Popover card.
   */
  display?: string

  /**
   * The min width of the Popover card.
   */
  minWidth?: number | string

  /**
   * The min height of the Popover card.
   */
  minHeight?: number | string

  /**
   * The height of the Popover card.
   */
  height?: number | string

  /**
   * Properties passed through to the Popover card.
   */
  statelessProps?: any

  /**
   * Duration of the animation.
   */
  animationDuration?: number

  /**
   * Function called when the Popover opens.
   */
  onOpen?: () => void

  /**
   * Function fired when Popover closes.
   */
  onClose?: () => void

  /**
   * Function that will be called when the enter transition is complete.
   */
  onOpenComplete?: () => void

  /**
   * Function that will be called when the exit transition is complete.
   */
  onCloseComplete?: () => void

  /**
   * When true, bring focus inside of the Popover on open.
   */
  bringFocusInside?: boolean

  /**
   * The minimum distance from the target to the element being positioned.
   */
  targetOffset?: number

  /**
   * Custom styles
   */
  style?: React.CSSProperties

  /**
   * When true, the Popover will render tinted overlay background under the target and popover wrapper
   */
  overlay?: boolean

  /**
   * When true and overlay is enabled, Popover's target element will be above overlay
   */
  elevate?: boolean

  /**
   * Function that will be called when the enter transition is started.
   */
  onOpenStarted?: () => void

  /**
   * Class name provided to the popup wrapper
   */
  className?: string
  /**
   * Type of open/close animation
   */
  transitionType?: 'scale' | 'expand'

  /**
   * If set to true, popover width will match target size
   */
  matchTargetWidth?: boolean

  /**
   * If set to true, exact (real number) target's position
   * will be used in positioner calculations
   */
  exactPosition?: boolean
}

type TargetProps = {
  isShown: boolean
  close: () => void
  open: () => void
  children: any
}

const Target = React.forwardRef<HTMLElement, TargetProps>((props, ref) => {
  const toggle = React.useCallback(() => {
    if (props.isShown) {
      props.close()
    } else {
      props.open()
    }
  }, [props])

  const handleKeyDown = React.useCallback(e => {
    // TODO:
    // if (e.key === "ArrowDown") {
    //   this.bringFocusInside()
    // }
  }, [])

  const isTooltipInside =
    React.isValidElement(props.children) && props.children.type === Tooltip
  const popoverTargetProps = {
    onClick: toggle,
    onKeyDown: handleKeyDown,
    role: 'button',
    'aria-expanded': props.isShown,
    'aria-haspopup': true
  }

  /**
   * Tooltips can be used within a Popover (not the other way around)
   * In this case the children is the Tooltip instead of a button.
   * Pass the properties to the Tooltip and let the Tooltip
   * add the properties to the target.
   */
  if (React.isValidElement<any>(props.children) && isTooltipInside) {
    return React.cloneElement(props.children, {
      popoverProps: {
        // getTargetRef,
        isShown: props.isShown,

        // These properties will be spread as `popoverTargetProps`
        // in the Tooltip component.
        ...popoverTargetProps
      }
    })
  }

  /**
   * When a function is passed, you can control the Popover manually.
   */
  if (typeof props.children === 'function') {
    return props.children({
      toggle,
      getRef: ref,
      isShown: props.isShown
    })
  }

  /**
   * With normal usage only popover props end up on the target.
   */
  return React.cloneElement(props.children, {
    ref,
    ...popoverTargetProps
  })
})

const S = {
  Popup: styled.div<PopoverProps & {popupWidth?: number}>`
    ${_ => _.theme.elevation.dropdown};
    border-radius: ${_ => _.theme.radius};
    overflow: hidden;
    min-width: ${_ => _.minWidth}px;
    min-height: ${_ => _.minHeight}px;
    ${_ => ({
      height: _.height
    })}
    ${_ => _.popupWidth && `width: ${_.popupWidth}px;`}
  `,
  Overlay: styled.div<{isShown: boolean}>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${_ => _.theme.colors.overlay.default};
    pointer-events: none;
    transition: opacity 0.12s linear;
    opacity: ${_ => (_.isShown ? '1' : '0')};
  `
}

export const Popover: React.FC<PopoverProps> = ({
  position = Position.BOTTOM as Position,
  minWidth = 200,
  minHeight = 40,
  height,
  animationDuration = 300,
  onOpen = () => {},
  onClose = () => {},
  onOpenComplete = () => {},
  onCloseComplete = () => {},
  onOpenStarted = () => {},
  targetOffset = 6,
  style: componentStyle,
  bringFocusInside = false,
  overlay = false,
  elevate = false,
  transitionType,
  exactPosition = false,
  ...props
}) => {
  const [isShown, setIsShown] = React.useState(false)
  const [targetWidth, setTargetWidth] = React.useState(0)
  const savedTargetStyles = React.useRef<(string | null)[]>([null, null])
  let targetRef = React.useRef<HTMLSpanElement | null>(null)
  let popoverNode = React.useRef<HTMLDivElement | null>(null)
  const open = React.useCallback(() => {
    if (isShown) return
    setIsShown(true)
    onOpen()
  }, [isShown, onOpen])
  const close = React.useCallback(() => {
    if (!isShown) return
    setIsShown(false)
    // TODO:
    // this.bringFocusBackToTarget()
    onClose()
  }, [isShown, onClose])
  const onBodyClick = React.useCallback(
    e => {
      // Ignore clicks on the popover or button
      if (targetRef.current !== null && targetRef.current.contains(e.target)) {
        return
      }

      if (
        popoverNode.current !== null &&
        popoverNode.current.contains(e.target)
      )
        return

      close()
    },
    [close]
  )
  const onEsc = React.useCallback(
    e => {
      // Esc key
      if (e.keyCode === 27) {
        close()
      }
    },
    [close]
  )
  const elevateTarget = () => {
    if (targetRef.current) {
      const {style} = targetRef.current
      savedTargetStyles.current = [style.zIndex, style.position]
      const currentPosition = getComputedStyle(targetRef.current).position
      style.zIndex = MAX_Z_INDEX
      style.position =
        currentPosition !== 'static' ? style.position : 'relative'
    }
  }
  const restoreElevatedTarget = () => {
    if (targetRef.current) {
      const {style} = targetRef.current
      const [savedZIndex, savedPosition] = savedTargetStyles.current
      if (savedZIndex !== null) style.zIndex = savedZIndex
      if (savedPosition !== null) style.position = savedPosition
    }
  }
  React.useEffect(() => {
    if (isShown) {
      document.body.addEventListener('mousedown', onBodyClick, false)
      document.body.addEventListener('keydown', onEsc, false)

      if (elevate) {
        elevateTarget()
      }
    } else {
      document.body.removeEventListener('mousedown', onBodyClick, false)
      document.body.removeEventListener('keydown', onEsc, false)

      restoreElevatedTarget()
    }
  }, [isShown, onBodyClick, onEsc])
  const handleOpenComplete = React.useCallback(() => {
    // TODO:
    // if (this.props.bringFocusInside) this.bringFocusInside()
    onOpenComplete()
  }, [onOpenComplete])

  const setTargetRef = React.useCallback(
    (ref: HTMLElement | null) => {
      targetRef.current = ref
      if (props.matchTargetWidth && ref && targetWidth !== ref.clientWidth) {
        const boundingClientRect = ref.getBoundingClientRect()
        setTargetWidth(boundingClientRect.width)
      }
    },
    [targetWidth]
  )

  React.useEffect(() => {
    return () => {
      document.body.removeEventListener('mousedown', onBodyClick, false)
      document.body.removeEventListener('keydown', onEsc, false)
    }
  }, [onBodyClick, onEsc])

  const shown = typeof props.isShown === 'boolean' ? props.isShown : isShown
  return (
    <>
      <Positioner
        target={({getRef}) => (
          <Target
            close={close}
            open={open}
            isShown={isShown}
            ref={ref => {
              getRef(ref)
              setTargetRef(ref)
            }}
          >
            {props.children}
          </Target>
        )}
        targetOffset={targetOffset}
        isShown={shown}
        position={position}
        animationDuration={animationDuration}
        onOpenComplete={handleOpenComplete}
        onCloseComplete={onCloseComplete}
        onOpenStarted={onOpenStarted}
        transitionType={transitionType}
        exactPosition={exactPosition}
      >
        {({style, state, getRef}) => (
          <S.Popup
            ref={ref => {
              getRef(ref)
              popoverNode.current = ref
            }}
            minHeight={minHeight}
            popupWidth={props.matchTargetWidth ? targetWidth : 0}
            minWidth={props.matchTargetWidth ? undefined : minWidth}
            data-state={state}
            height={height}
            style={{...style, ...componentStyle}}
            className={props.className}
            {...props.statelessProps}
          >
            {typeof props.content === 'function'
              ? props.content({close})
              : props.content}
          </S.Popup>
        )}
      </Positioner>
      {overlay && (
        <Portal>
          <S.Overlay isShown={isShown} />
        </Portal>
      )}
    </>
  )
}
