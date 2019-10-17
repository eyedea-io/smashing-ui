import {Strong, StrongProps} from '@smashing/typography'
import styled, {css} from 'styled-components'
import {BadgeColors} from './types'

interface StyledBadgeProps extends StrongProps {
  color: any
  backgroundColor: BadgeColors
  appearance: 'solid' | 'subtle'
}

const getBackgroundColor = ({appearance, backgroundColor}) =>
  appearance === 'subtle'
    ? css`
        background: ${_ => _.theme.palette[backgroundColor].light};
      `
    : css`
        background: ${_ => _.theme.palette[backgroundColor].base};
      `

export const StyledBadge = styled(Strong)<StyledBadgeProps>`
  padding: 2px 6px;
  border-radius: 2px;
  ${getBackgroundColor};
`

export const StyledPill = styled(Strong)<StyledBadgeProps>`
  padding: 2px 6px;
  border-radius: 45px;
  ${getBackgroundColor};
`
