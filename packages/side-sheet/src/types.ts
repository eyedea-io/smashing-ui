import * as React from 'react'
import {constants} from '@smashing/theme'

const {position: Position} = constants
export type Position = 'top' | 'bottom' | 'left' | 'right'

export interface SideSheetProps {
  /**
   * Children can be a string, node or a function accepting `({ close })`.
   */
  children: React.ReactNode | React.FC<{close: () => void}>
  /**
   * When true, the side sheet is shown.
   */
  isShown?: boolean
  /**
   * Function that will be called when the exit transition is complete.
   */
  onCloseComplete?: () => void

  /**
   * Function that will be called when the enter transition is complete.
   */
  onOpenComplete?: () => void
  /**
   * Function called when overlay is about to close.
   * Return `false` to prevent the sheet from closing.
   * type: `Function -> Boolean`
   */
  onBeforeClose?: () => void
  /**
   * Boolean indicating if clicking the overlay should close the overlay.
   */
  shouldCloseOnOverlayClick?: boolean

  /**
   * Boolean indicating if pressing the esc key should close the overlay.
   */
  shouldCloseOnEscapePress?: boolean
  /**
   * Width of the Side Sheet.
   */
  width?: string | number
  /**
   * Props that are passed to the side sheet container.
   */
  containerProps?: object

  /**
   * Positions the sheet to the top, left, right, or bottom of the screen.
   */
  position?: Position

  /**
   * Whether or not to prevent scrolling in the outer body
   */
  preventBodyScrolling: boolean
}

export const getBoxPosition = (position?: string) => {
  switch (position) {
    case Position.LEFT:
      return {
        height: '100vh',
        maxWidth: '100vw',
        position: 'absolute' as 'absolute',
        left: 0,
        right: 'auto'
      }
    case Position.RIGHT:
      return {
        height: '100vh',
        maxWidth: '100vw',
        position: 'absolute' as 'absolute',
        right: 0,
        left: 'auto'
      }
    case Position.TOP:
      return {
        width: '100vw',
        position: 'absolute' as 'absolute',
        maxHeight: '100vh',
        top: 0,
        bottom: 'auto'
      }
    case Position.BOTTOM:
      return {
        width: '100vw',
        maxHeight: '100vh',
        position: 'absolute' as 'absolute',
        bottom: 0,
        top: 'auto'
      }
    default:
      return {
        height: '100vh',
        maxWidth: '100vw',
        position: 'absolute' as 'absolute',
        left: 0,
        right: 'auto'
      }
  }
}
