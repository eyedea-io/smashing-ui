import * as React from 'react'
import {useDefaults} from '@smashing/theme'
import {BadgeAppearances, Props, BadgeColors} from './types'
import {StyledPill} from './styles'

const Pill: React.FC<Props> = ({children, ...props}) => {
  const {color, appearance, ...defaults} = useDefaults<Props>('badge', props, {
    color: 'neutral',
    appearance: 'subtle'
  })

  return (
    <StyledPill
      variant={300}
      color={appearance === 'subtle' ? color : 'white'}
      backgroundColor={color}
      appearance={appearance}
      style={{...defaults}}
    >
      {children}
    </StyledPill>
  )
}

export {Pill, Props}

declare module 'styled-components' {
  export interface SmashingPillDefaults
    extends Partial<{
      pill?: {
        color: BadgeColors
        appearance: BadgeAppearances
      }
    }> {}
}
