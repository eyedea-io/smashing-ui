import * as React from 'react'
import {useDefaults} from '@smashing/theme'
import {Strong} from '@smashing/typography'
import * as S from './styles'
import {TabListProps, TabProps, TabsAppearanceType} from './types'

export const Tablist: React.FC<TabListProps> = ({
  children,
  invalid,
  ...props
}) => {
  const defaults = useDefaults('tablist', props, {
    appearance: 'default' as TabsAppearanceType
  })

  return (
    <S.TabList invalid={invalid} {...props} {...defaults} role="tablist">
      {children}
    </S.TabList>
  )
}

export const Tab: React.FC<TabProps> = ({invalid, children, ...props}) => {
  const defaults = useDefaults('tab', props, {
    appearance: 'default' as TabsAppearanceType,
    isSelected: false
  })
  return (
    <S.Tab invalid={invalid} {...props} {...defaults} role="tabpanel">
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
