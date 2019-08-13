import * as React from 'react'
import {TableBoxProps} from './types/tableBox'
import styled from 'styled-components'
import {useDefaults} from '@smashing/theme'

export const TableBox: React.FC<TableBoxProps> = ({border, ...props}) => {
  const getHoverElevationStyle = (hoverElevation, css) => {
    const {theme} = props
    if (!Number.isInteger(hoverElevation)) return {}

    return {
      transitionDuration: '150ms',
      transitionProperty: 'box-shadow, transform',
      transitionTimingFunction: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
      ':hover': {
        ...(css[':hover'] || {}),
        transform: 'translateY(-2px)',
        boxShadow: theme.getElevation(hoverElevation)
      }
    }
  }

  const getActiveElevationStyle = (activeElevation, css) => {
    const {theme} = props
    if (!Number.isInteger(activeElevation)) return {}

    return {
      ':active': {
        ...(css[':active'] || {}),
        transform: 'translateY(-1px)',
        boxShadow: theme.getElevation(activeElevation)
      }
    }
  }

  const getBorderSideProperty = ({borderSideProperty, border}) => {
    const {theme} = props
    if (
      Object.prototype.hasOwnProperty.call(
        theme.colors.border,
        borderSideProperty
      )
    ) {
      return `1px solid ${theme.colors.border[borderSideProperty]}`
    }

    if (borderSideProperty === true) {
      return `1px solid ${theme.colors.border.default}`
    }

    if (borderSideProperty === false) {
      return null
    }

    if (Object.prototype.hasOwnProperty.call(theme.colors.border, border)) {
      return `1px solid ${theme.colors.border[border]}`
    }

    if (border === true) {
      return `1px solid ${theme.colors.border.default}`
    }

    return borderSideProperty
  }
  const elevationStyle = props.theme.getElevation(props.elevation)
  const hoverElevationStyle = getHoverElevationStyle(
    props.hoverElevation,
    props.css
  )
  const activeElevationStyle = getActiveElevationStyle(
    props.activeElevation,
    props.css
  )

  const [_borderTop, _borderRight, _borderBottom, _borderLeft] = [
    props.borderTop,
    props.borderRight,
    props.borderBottom,
    props.borderLeft
  ].map(borderSideProperty =>
    getBorderSideProperty({borderSideProperty, border})
  )

  const defaults = useDefaults('tableBox', props, {
    appearance: 'default',
    tabIndex: -1,
    onClick: () => {},
    overflow: 'hidden',
    height: '100px'
  })

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
  `
  return (
    <Box
      borderTop={_borderTop}
      borderRight={_borderRight}
      borderBottom={_borderBottom}
      borderLeft={_borderLeft}
      boxShadow={elevationStyle}
      background={props.theme.getBackground(props.background)}
      css={{
        ...props.css,
        ...hoverElevationStyle,
        ...activeElevationStyle
      }}
      {...props}
    />
  )
}
