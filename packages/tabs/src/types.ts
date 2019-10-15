export type TabsAppearanceType = 'flat' | 'default'

export interface TablistProps {
  appearance?: TabsAppearanceType
}

export interface TabProps {
  appearance?: TabsAppearanceType
  isSelected?: boolean
  onClick: React.MouseEventHandler<HTMLLIElement>
}
