import styled from 'styled-components'
import {TabProps, TablistProps} from './types'

export const Tablist = styled.ul<TablistProps>`
  ${_ => (_.appearance !== 'flat' ? _.theme.elevation.dropdown : {})};
  position: relative;
  z-index: 1;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  list-style: none;
  margin: 0;
  padding: 0;
`

export const Tab = styled.li<TabProps>`
  padding: ${_ => _.theme.spacing.sm};
  position: relative;
  cursor: pointer;

  strong {
    color: ${_ => !_.isSelected && _.theme.colors.text.muted};
  }

  svg path {
    fill: currentColor;
  }

  &:hover > * {
    color: ${_ => _.theme.colors.text.selected};
  }

  &::after {
    ${_ => (_.isSelected && _.appearance !== 'flat' ? {content: '\'\''} : {})};
    height: 4px;
    display: block;
    position: absolute;
    bottom: 0;
    left: ${_ => _.theme.spacing.xs};
    right: ${_ => _.theme.spacing.xs};
    border-radius: 2px 2px 0 0;
    background: ${_ => _.theme.colors.text.default};
  }
`
