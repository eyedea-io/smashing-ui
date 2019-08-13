import * as React from 'react'

export interface TableBoxProps {
  border?: string | boolean
  borderTop?: string | boolean
  borderRight?: string | boolean
  borderBottom?: string | boolean
  borderLeft?: string | boolean
  width?: string | number
  height?: string | number
  onKeyDown?: (e) => void
  onKeyPress?: (e) => void
  overflow?: string
  innerRef?: any
  theme?: any
  elevation?: any
  hoverElevation?: any
  activeElevation?: any
  css?: any
  boxShadow?: any
  background?: any
  onClick?: any
  isHighlighted?: any
  tabIndex?: any
}
