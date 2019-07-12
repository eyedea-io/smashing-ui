import * as React from "react"
import {Positioner} from "@smashing/positioner"
import {Tooltip} from "@smashing/tooltip"
import {constants} from "@smashing/theme"
import styled from "styled-components"

const {position: Position} = constants
export type Position =
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "left"
  | "right"

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
  content: React.ReactNode

  /**
   * The target button of the Popover.
   * When a function the following arguments are passed:
   * ({ toggle: Function -> Void, getRef: Function -> Ref, isShown: Bool })
   */
  children:
    | React.ReactElement
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
}

const Target = (props: {
  isShown: boolean
  close: () => void
  open: () => void
  children: any
  innerRef: any
}) => {
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
    role: "button",
    "aria-expanded": props.isShown,
    "aria-haspopup": true
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
  if (typeof props.children === "function") {
    return props.children({
      toggle,
      getRef: props.innerRef,
      isShown: props.isShown
    })
  }

  /**
   * With normal usage only popover props end up on the target.
   */
  return React.cloneElement(props.children, {
    innerRef: props.innerRef,
    ...popoverTargetProps
  })
}

const S = {
  Popup: styled.div`
    ${_ => _.theme.elevation.dropdown};
    border-radius: ${_ => _.theme.radius};
    overflow: hidden;
    min-width: 200px;
  `
}

export const Popover: React.FC<PopoverProps> = ({
  position = Position.BOTTOM as Position,
  minWidth = 200,
  minHeight = 40,
  animationDuration = 300,
  onOpen = () => {},
  onClose = () => {},
  onOpenComplete = () => {},
  onCloseComplete = () => {},
  bringFocusInside = false,
  ...props
}) => {
  const [isShown, setIsShown] = React.useState(false)
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
  React.useEffect(() => {
    if (isShown) {
      document.body.addEventListener("click", onBodyClick, false)
      document.body.addEventListener("keydown", onEsc, false)
    } else {
      document.body.removeEventListener("click", onBodyClick, false)
      document.body.removeEventListener("keydown", onEsc, false)
    }
  }, [isShown, onBodyClick, onEsc])
  const handleOpenComplete = React.useCallback(() => {
    // TODO:
    // if (this.props.bringFocusInside) this.bringFocusInside()
    onOpenComplete()
  }, [onOpenComplete])

  React.useEffect(() => {
    return () => {
      document.body.removeEventListener("click", onBodyClick, false)
      document.body.removeEventListener("keydown", onEsc, false)
    }
  }, [onBodyClick, onEsc])

  const shown = typeof props.isShown === "boolean" ? props.isShown : isShown

  return (
    <Positioner
      target={({getRef}) => (
        <Target
          close={close}
          open={open}
          isShown={isShown}
          innerRef={ref => {
            getRef(ref)
            targetRef.current = ref
          }}
        >
          {props.children}
        </Target>
      )}
      isShown={shown}
      position={position}
      animationDuration={animationDuration}
      onOpenComplete={handleOpenComplete}
      onCloseComplete={onCloseComplete}
    >
      {({style, state, getRef}) => (
        <S.Popup
          ref={ref => {
            getRef(ref)
            popoverNode.current = ref
          }}
          data-state={state}
          style={style}
          {...props.statelessProps}
        >
          {typeof props.content === "function"
            ? props.content({close})
            : props.content}
        </S.Popup>
      )}
    </Positioner>
  )
}
