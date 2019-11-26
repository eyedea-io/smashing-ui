import {TableBoxProps} from './table-box'

export interface TableHeadProps extends TableBoxProps {
  height?: number | string
  accountForScrollbar?: boolean
}

export interface ScrollbarSizeProps {
  handleScrollbarSize?: (width) => void
}
