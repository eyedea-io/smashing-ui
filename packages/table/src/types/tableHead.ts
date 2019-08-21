import * as React from 'react'
import {TableBoxProps} from './tableBox'

export interface TableHeadProps extends TableBoxProps {
  height?: number | string
  accountForScrollbar?: boolean
}

export interface ScrollbarSizeProps {
  handleScrollbarSize?: (width) => void
}
