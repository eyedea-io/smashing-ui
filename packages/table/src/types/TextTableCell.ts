import * as React from 'react'
import {TableCellProps} from './tableCell'

export interface TextTableCellProps extends TableCellProps {
  /**
   * Adds textAlign: right and fontFamily: mono.
   */
  isNumber?: boolean
  /**
   * Pass additional props to the Text component.
   */
  textProps?: any
}

export interface TextTableHeaderCellProps extends TableCellProps {
  /**
   * Pass additional props to the Text component.
   */
  textProps?: any
}
