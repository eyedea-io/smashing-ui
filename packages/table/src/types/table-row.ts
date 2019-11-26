import {TableBoxProps} from './table-box'

export interface TableRowProps extends TableBoxProps {
  height?: string | number
  onSelect?: () => void
  onDeselect?: () => void
  isSelectable?: boolean
  isSelected?: boolean
  isHighlited?: boolean
  intent?: TableRowIntentType
  appearance?: string
  theme?: any
}

export type TableRowIntentType =
  | 'success'
  | 'warning'
  | 'info'
  | 'danger'
  | 'none'
