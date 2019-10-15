import * as React from 'react'
import {useDefaults} from '@smashing/theme'
import {Strong} from '@smashing/typography'
import * as S from './styles'
import {TablistProps, TabProps, TabsAppearanceType} from './types'

export const Tablist: React.FC<TablistProps> = ({children, ...props}) => {
  const defaults = useDefaults('tablist', props, {
    appearance: 'default' as TabsAppearanceType
  })
  return (
    <S.Tablist {...props} {...defaults} role="tablist">
      {children}
    </S.Tablist>
  )
}

export const Tab: React.FC<TabProps> = ({children, ...props}) => {
  const defaults = useDefaults('tab', props, {
    appearance: 'default' as TabsAppearanceType,
    isSelected: false
  })
  return (
    <S.Tab {...props} {...defaults} role="tabpanel">
      <Strong>{children}</Strong>
    </S.Tab>
  )
}

declare module 'styled-components' {
  export interface SmashingTabsDefaults
    extends Partial<{
      tab?: {
        appearance?: TabsAppearanceType
        isSelected: boolean
      }
      tablist?: {
        appearance?: TabsAppearanceType
      }
    }> {}
}
