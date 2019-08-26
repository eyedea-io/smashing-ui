import styled, {css} from 'styled-components'
import {getTextColor, getFontFamily} from '../utils'
import {getTextStyle} from '../styles/text'

export interface LabelProps {
  variant?: 300 | 400 | 500
  fontFamily?: 'ui' | 'display' | 'mono'
  marginTop?: number
}

export const Label = styled.label<LabelProps>`
  ${({variant = 400, fontFamily, marginTop}) => css`
    ${getTextStyle({variant, fontFamily, color: 'intense'})}
    font-weight: 500;
    ${typeof marginTop === 'number' &&
      css`
        margin-top: ${marginTop};
      `};
  `}
`
