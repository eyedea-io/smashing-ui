import * as React from 'react'
import {TableBoxProps} from './types/tableBox'
import styled from 'styled-components'
import {useDefaults} from '@smashing/theme'

export const TableBox: React.FC<TableBoxProps> = ({border, ...props}) => {
  // const getBorderSideProperty = ({borderSideProperty, border}) => {
  //   const {theme} = props
  //   if (
  //     Object.prototype.hasOwnProperty.call(
  //       borderSideProperty
  //     )
  //   ) {
  //     return `1px solid ${_ => _.theme.colors.border[borderSideProperty]}`
  //   }

  //   if (borderSideProperty === true) {
  //     return `1px solid ${_ => _.theme.colors.border.default}`
  //   }

  //   if (borderSideProperty === false) {
  //     return null
  //   }

  //   if (
  //     Object.prototype.hasOwnProperty.call(_ => _.theme.colors.border, border)
  //   ) {
  //     return `1px solid ${_ => _.theme.colors.border[border]}`
  //   }

  //   if (border === true) {
  //     return `1px solid ${_ => _.theme.colors.border.default}`
  //   }

  //   return borderSideProperty
  // }

  // const [_borderTop, _borderRight, _borderBottom, _borderLeft] = [
  //   props.borderTop,
  //   props.borderRight,
  //   props.borderBottom,
  //   props.borderLeft
  // ].map(borderSideProperty =>
  //   getBorderSideProperty({borderSideProperty, border})
  // )

  const defaults = useDefaults('tableBox', props, {
    appearance: 'default',
    tabIndex: -1,
    onClick: () => {},
    overflow: 'hidden',
    height: '100px'
  })
  const hoverState = '&[data-isselectable="true"]:hover'

  const Box = styled.div<TableBoxProps>`
    padding: 12;
    box-sizing: 'border-box';
    flex: 1;
    display: 'flex';
    align-items: 'center';
    flex-shrink: 0;
    height: ${_ => defaults.height};
    overflow: ${_ => defaults.overflow};
    width: ${_ => _.width};
    ${_ => _.theme.elevation.dialog};
  `
  return (
    <Box
      // borderTop={_borderTop}
      // borderRight={_borderRight}
      // borderBottom={_borderBottom}
      // borderLeft={_borderLeft}
      {...props}
    />
  )
}
