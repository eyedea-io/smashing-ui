import * as React from 'react'
import {TableBoxProps} from './tableBox'

export interface ArrowKeysOverrides {
  up: () => void | string | React.ReactNode | false
  down: () => void | string | React.ReactNode | false
  left: () => void | string | React.ReactNode | false
  right: () => void | string | React.ReactNode | false
}

export interface TableCellProps extends TableBoxProps {
  /*
   * Makes the TableCell focusable. Used by EditableCell.
   * Will add tabIndex={-1 || this.props.tabIndex}.
   */
  isSelectable?: boolean

  /**
   * The appearance of the table row. Default theme only support default.
   */
  appearance?: string

  /**
   * Optional node to be placed on the right side of the table cell.
   * Useful for icons and icon buttons.
   */
  rightView?: React.ReactNode

  /**
   * Theme provided by ThemeProvider.
   */
  theme?: any

  /**
   * Advanced arrow keys overrides for selectable cells.
   * A string will be used as a selector.
   */
  arrowKeysOverrides?: ArrowKeysOverrides
  innerRef?: any
  onkeydown?: any
  onkeypress?: any
  tabIndex?: any
  onClick?: () => void
  height?: number | string
}
