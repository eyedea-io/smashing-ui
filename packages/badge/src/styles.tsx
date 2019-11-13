import {Strong, StrongProps} from '@smashing/typography'
import styled from 'styled-components'
import {BadgeColors} from './types'

interface StyledBadgeProps extends StrongProps {
  color: any
  backgroundColor: BadgeColors
  appearance: 'solid' | 'subtle'
}

export const StyledBadge = styled(Strong)<StyledBadgeProps>`
  padding: 2px 6px;
  border-radius: 2px;
  ${_ => ({
    background: {
      subtle: _.theme.palette[_.backgroundColor].light,
      solid: _.theme.palette[_.backgroundColor].base
    }[_.appearance]
  })}
`

export const StyledPill = styled(Strong)<StyledBadgeProps>`
  padding: 2px 6px;
  border-radius: 45px;
  ${_ => ({
    background: {
      subtle: _.theme.palette[_.backgroundColor].light,
      solid: _.theme.palette[_.backgroundColor].base
    }[_.appearance]
  })}
`
