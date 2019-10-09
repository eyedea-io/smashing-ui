import * as React from 'react'
import {useDefaults} from '@smashing/theme'
import {Props, BadgeColors, BadgeAppearances} from './types'
import {StyledBadge} from './styles'

const Badge: React.FC<Props> = ({children, ...props}) => {
  const {color, appearance, ...defaults} = useDefaults<Props>('badge', props, {
    color: 'neutral',
    appearance: 'subtle'
  })

  return (
    <StyledBadge
      variant={300}
      color={appearance === 'subtle' ? color : 'white'}
      backgroundColor={color}
      appearance={appearance}
      style={{...defaults}}
    >
      {children}
    </StyledBadge>
  )
}

export {Badge, Props}

declare module 'styled-components' {
  export interface SmashingBadgeDefaults
    extends Partial<{
      badge?: {
        color: BadgeColors
        appearance: BadgeAppearances
      }
    }> {}
}
