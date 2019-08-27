import styled, {css} from 'styled-components'
import {getTextStyle} from '../styles/text'
import {LabelVariant, LabelFontFamily} from '../types'

export interface LabelProps {
  variant?: LabelVariant
  fontFamily?: LabelFontFamily
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
